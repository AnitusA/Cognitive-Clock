import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';
import TeamCard from './components/TeamCard';
import ControlPanel from './components/ControlPanel';
import LifelineDrawer from './components/LifelineDrawer';
import DareModal from './components/DareModal';
import WinnerDisplay from './components/WinnerDisplay';
import QuestionPanel from './components/QuestionPanel';
import { calculateTimeUpdate, calculatePointsUpdate } from './utils/gameLogic';
import { QUESTIONS } from './data/questions';
import { LIFELINES } from './data/lifelines';
import { DARES } from './data/dares';
import { createRandomPool, drawWithAutoReset } from './utils/randomizer';
import { canUseLifeline, canUseDare } from './utils/validator';
import { canUseFallback, shouldEliminate, handleTimeout, getFallbackOptions } from './utils/eliminationLogic';
import { shuffleQuestionsByCategory } from './utils/questionShuffler';

const TEAM_COLORS = {
    A: { color: '#3b82f6', rgb: '59, 130, 246' },      // Blue
    B: { color: '#60a5fa', rgb: '96, 165, 250' },      // Light Blue
    C: { color: '#93c5fd', rgb: '147, 197, 253' },     // Lighter Blue
    D: { color: '#2563eb', rgb: '37, 99, 235' }        // Dark Blue
};

function App() {
    // Shuffle questions once at app start with category rotation
    const shuffledQuestions = useMemo(() => shuffleQuestionsByCategory(QUESTIONS), []);
    const defaultTeams = {
        A: {
            time: 120,
            points: 0,
            locked: false,
            frozen: false,
            consecutiveWrong: 0,
            doubleOrNothing: false,
            lifelinesUsed: 0,
            daresUsed: 0,
            maxLifelines: 3,
            maxDares: 3,
            eliminated: false,
            timeoutOccurred: false,
            fallbackAvailable: false
        },
        B: {
            time: 120,
            points: 0,
            locked: false,
            frozen: false,
            consecutiveWrong: 0,
            doubleOrNothing: false,
            lifelinesUsed: 0,
            daresUsed: 0,
            maxLifelines: 3,
            maxDares: 3,
            eliminated: false,
            timeoutOccurred: false,
            fallbackAvailable: false
        },
        C: {
            time: 120,
            points: 0,
            locked: false,
            frozen: false,
            consecutiveWrong: 0,
            doubleOrNothing: false,
            lifelinesUsed: 0,
            daresUsed: 0,
            maxLifelines: 3,
            maxDares: 3,
            eliminated: false,
            timeoutOccurred: false,
            fallbackAvailable: false
        },
        D: {
            time: 120,
            points: 0,
            locked: false,
            frozen: false,
            consecutiveWrong: 0,
            doubleOrNothing: false,
            lifelinesUsed: 0,
            daresUsed: 0,
            maxLifelines: 3,
            maxDares: 3,
            eliminated: false,
            timeoutOccurred: false,
            fallbackAvailable: false
        }
    };

    const [teams, setTeams] = useState(() => {
        const saved = localStorage.getItem('cognitive-clock-teams');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // If any team has less than 120 seconds, reset all to default
                const all120 = ['A','B','C','D'].every(t => parsed[t] && parsed[t].time >= 120);
                return all120 ? parsed : defaultTeams;
            } catch {
                return defaultTeams;
            }
        }
        return defaultTeams;
    });
    // Persist teams to localStorage on change
    React.useEffect(() => {
        localStorage.setItem('cognitive-clock-teams', JSON.stringify(teams));
    }, [teams]);

    const [activeTeam, setActiveTeam] = useState(null);
    const [questionStartTime, setQuestionStartTime] = useState(null);
    const [lifelineModalOpen, setLifelineModalOpen] = useState(false);
    const [dareModalOpen, setDareModalOpen] = useState(false);
    const [currentLifeline, setCurrentLifeline] = useState(null);
    const [currentDare, setCurrentDare] = useState(null);
    const [dareTeam, setDareTeam] = useState(null);
    const [gameEnded, setGameEnded] = useState(false);
    const [timePenaltyAlert, setTimePenaltyAlert] = useState(null); // team name or null

    // Randomizer pools
    const [lifelinePool, setLifelinePool] = useState(() => createRandomPool(LIFELINES));
    const [darePool, setDarePool] = useState(() => createRandomPool(DARES));

    const timerIntervalRef = useRef(null);

    // Timer effect - runs every 100ms only when a question is assigned
    useEffect(() => {
        if (activeTeam && questionStartTime && !teams[activeTeam].locked && !teams[activeTeam].frozen && !teams[activeTeam].eliminated) {
            timerIntervalRef.current = setInterval(() => {
                setTeams(prev => {
                    const newTime = Math.max(0, prev[activeTeam].time - 0.1);

                    // Check if time reached zero
                    if (newTime <= 0 && prev[activeTeam].time > 0) {
                        const timeoutResult = handleTimeout(prev[activeTeam]);
                        if (timeoutResult.shouldEliminate) {
                            return {
                                ...prev,
                                [activeTeam]: {
                                    ...prev[activeTeam],
                                    time: 0,
                                    locked: true,
                                    eliminated: true,
                                    timeoutOccurred: true,
                                    fallbackAvailable: false
                                }
                            };
                        } else {
                            return {
                                ...prev,
                                [activeTeam]: {
                                    ...prev[activeTeam],
                                    time: 0,
                                    locked: true,
                                    timeoutOccurred: true,
                                    fallbackAvailable: true
                                }
                            };
                        }
                    }

                    return {
                        ...prev,
                        [activeTeam]: {
                            ...prev[activeTeam],
                            time: newTime
                        }
                    };
                });
            }, 100);

            return () => {
                if (timerIntervalRef.current) {
                    clearInterval(timerIntervalRef.current);
                }
            };
        }
        // Cleanup if no active question
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
        };
    }, [activeTeam, questionStartTime, teams]);

    const handleAssignQuestion = (teamName) => {
        if (teams[teamName].frozen) {
            setTeams(prev => ({
                ...prev,
                [teamName]: {
                    ...prev[teamName],
                    frozen: false
                }
            }));
            return;
        }
        setActiveTeam(teamName);
        setQuestionStartTime(Date.now());
        // Timer will start via useEffect
    };

    const handleCorrectAnswer = () => {
        if (!activeTeam) return;
        // Stop timer immediately
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        const timeTaken = (Date.now() - questionStartTime) / 1000;
        const team = teams[activeTeam];

        setTeams(prev => ({
            ...prev,
            [activeTeam]: {
                ...prev[activeTeam],
                time: Math.max(0, prev[activeTeam].time + 10), // Add 10 seconds
                points: calculatePointsUpdate(team.points, true, team.doubleOrNothing),
                consecutiveWrong: 0,
                doubleOrNothing: false
            }
        }));

        setActiveTeam(null);
        setQuestionStartTime(null);
    };

    const handleWrongAnswer = () => {
        if (!activeTeam) return;
        // Stop timer immediately
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        const timeTaken = (Date.now() - questionStartTime) / 1000;
        const team = teams[activeTeam];
        const newConsecutiveWrong = team.consecutiveWrong + 1;

        setTeams(prev => ({
            ...prev,
            [activeTeam]: {
                ...prev[activeTeam],
                time: Math.max(0, prev[activeTeam].time - 5), // Subtract 5 seconds
                points: calculatePointsUpdate(team.points, false, team.doubleOrNothing),
                consecutiveWrong: newConsecutiveWrong,
                doubleOrNothing: false
            }
        }));

        setTimePenaltyAlert(activeTeam);
        setTimeout(() => setTimePenaltyAlert(null), 1500);

        if (newConsecutiveWrong >= 2) {
            setTimeout(() => {
                triggerDare(activeTeam);
            }, 500);
        }

        setActiveTeam(null);
        setQuestionStartTime(null);
    };

    const handleLifeline = () => {
        // Validate usage limit
        if (!activeTeam || !canUseLifeline(teams[activeTeam])) {
            return; // Silently block invalid action
        }

        // Draw from pool with auto-reset
        const { item: drawnLifeline, updatedPool } = drawWithAutoReset(lifelinePool, LIFELINES);

        if (drawnLifeline) {
            setCurrentLifeline(drawnLifeline);
            setLifelinePool(updatedPool);
            setLifelineModalOpen(true);
        }
    };

    const handleApplyLifeline = (lifeline, targetTeam) => {
        const message = lifeline.effect(teams, activeTeam, targetTeam);

        // Increment lifeline counter
        setTeams(prev => ({
            ...prev,
            [activeTeam]: {
                ...prev[activeTeam],
                lifelinesUsed: prev[activeTeam].lifelinesUsed + 1
            }
        }));

        setLifelineModalOpen(false);

        // Show notification (you could add a toast notification here)
        console.log(message);
    };

    const triggerDare = (teamName) => {
        // Draw from pool with auto-reset
        const { item: drawnDare, updatedPool } = drawWithAutoReset(darePool, DARES);

        if (drawnDare) {
            setCurrentDare(drawnDare);
            setDarePool(updatedPool);
            setDareTeam(teamName);
            setDareModalOpen(true);
        }
    };

    const handleDareComplete = () => {
        if (dareTeam && currentDare) {
            // Increment dare counter and add time bonus
            setTeams(prev => ({
                ...prev,
                [dareTeam]: {
                    ...prev[dareTeam],
                    daresUsed: prev[dareTeam].daresUsed + 1,
                    consecutiveWrong: 0,
                    time: Math.max(0, prev[dareTeam].time + (currentDare.reward || 0))
                }
            }));
        }

        setDareModalOpen(false);
        setCurrentDare(null);
        setDareTeam(null);
    };

    const handleEndGame = () => {
        setGameEnded(true);
        setActiveTeam(null);
        // Clear persisted teams on end game
        localStorage.removeItem('cognitive-clock-teams');
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
    };

    const handleUnlockPlayer = (teamName) => {
        setTeams(prev => ({
            ...prev,
            [teamName]: {
                ...prev[teamName],
                locked: false
            }
        }));
    };

    const handleFallbackLifeline = (teamName) => {
        const team = teams[teamName];

        // Validate fallback is available and team has lifelines
        if (!team.fallbackAvailable || team.lifelinesUsed >= team.maxLifelines) {
            return;
        }

        // Consume one lifeline, reset fallback, unlock team
        setTeams(prev => ({
            ...prev,
            [teamName]: {
                ...prev[teamName],
                lifelinesUsed: prev[teamName].lifelinesUsed + 1,
                fallbackAvailable: false,
                timeoutOccurred: false,
                locked: false
            }
        }));
    };

    const handleFallbackDare = (teamName) => {
        const team = teams[teamName];

        // Validate fallback is available and team has dares
        if (!team.fallbackAvailable || team.daresUsed >= team.maxDares) {
            return;
        }

        // Consume one dare, reset fallback, unlock team
        setTeams(prev => ({
            ...prev,
            [teamName]: {
                ...prev[teamName],
                daresUsed: prev[teamName].daresUsed + 1,
                fallbackAvailable: false,
                timeoutOccurred: false,
                locked: false
            }
        }));
    };

    const handleEliminate = (teamName) => {
        // Manually eliminate a team
        setTeams(prev => ({
            ...prev,
            [teamName]: {
                ...prev[teamName],
                eliminated: true,
                locked: true,
                fallbackAvailable: false
            }
        }));
    };

    const handleRestart = () => {
        setTeams({
            A: { time: 120, points: 0, locked: false, frozen: false, consecutiveWrong: 0, doubleOrNothing: false, lifelinesUsed: 0, daresUsed: 0, maxLifelines: 3, maxDares: 3, eliminated: false, timeoutOccurred: false, fallbackAvailable: false },
            B: { time: 120, points: 0, locked: false, frozen: false, consecutiveWrong: 0, doubleOrNothing: false, lifelinesUsed: 0, daresUsed: 0, maxLifelines: 3, maxDares: 3, eliminated: false, timeoutOccurred: false, fallbackAvailable: false },
            C: { time: 120, points: 0, locked: false, frozen: false, consecutiveWrong: 0, doubleOrNothing: false, lifelinesUsed: 0, daresUsed: 0, maxLifelines: 3, maxDares: 3, eliminated: false, timeoutOccurred: false, fallbackAvailable: false },
            D: { time: 120, points: 0, locked: false, frozen: false, consecutiveWrong: 0, doubleOrNothing: false, lifelinesUsed: 0, daresUsed: 0, maxLifelines: 3, maxDares: 3, eliminated: false, timeoutOccurred: false, fallbackAvailable: false }
        });
        localStorage.removeItem('cognitive-clock-teams');
        setActiveTeam(null);
        setQuestionStartTime(null);
        setGameEnded(false);
        setLifelineModalOpen(false);
        setDareModalOpen(false);
        setCurrentDare(null);
        setDareTeam(null);
    };

    if (gameEnded) {
        return (
            <div className="app">
                <WinnerDisplay teams={teams} onRestart={handleRestart} />
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Cognitive Clock</h1>
                <p className="app-subtitle">Four-Team Strategic Quiz Challenge</p>
            </header>

            <div className="dashboard">
                {Object.keys(teams).map((teamName) => (
                    <TeamCard
                        key={teamName}
                        team={teams[teamName]}
                        teamName={teamName}
                        isActive={activeTeam === teamName}
                        accentColor={TEAM_COLORS[teamName].color}
                        accentRgb={TEAM_COLORS[teamName].rgb}
                        showTimePenalty={timePenaltyAlert === teamName}
                    />
                ))}
            </div>

            <QuestionPanel questions={shuffledQuestions} />

            <ControlPanel
                activeTeam={activeTeam}
                teams={teams}
                onAssignQuestion={handleAssignQuestion}
                onCorrectAnswer={handleCorrectAnswer}
                onWrongAnswer={handleWrongAnswer}
                onLifeline={handleLifeline}
                onDare={() => triggerDare(activeTeam)}
                onUnlockPlayer={handleUnlockPlayer}
                onFallbackLifeline={handleFallbackLifeline}
                onFallbackDare={handleFallbackDare}
                onEliminate={handleEliminate}
                onEndGame={handleEndGame}
            />

            <LifelineDrawer
                isOpen={lifelineModalOpen}
                onClose={() => setLifelineModalOpen(false)}
                onApply={handleApplyLifeline}
                drawnLifeline={currentLifeline}
                currentTeam={activeTeam}
                teams={teams}
            />

            <DareModal
                isOpen={dareModalOpen}
                onClose={() => setDareModalOpen(false)}
                onComplete={handleDareComplete}
                dare={currentDare}
                teamName={dareTeam}
            />
        </div>
    );
}

export default App;



