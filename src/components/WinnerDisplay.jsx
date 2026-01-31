import React from 'react';
import { Trophy, Crown, Clock, Award, RefreshCw, Info } from 'lucide-react';
import { calculateFinalScore, formatTime } from '../utils/gameLogic';

const WinnerDisplay = ({ teams, onRestart }) => {
    // Calculate final scores for all teams
    const scores = Object.keys(teams).map(teamName => ({
        player: teamName,
        time: teams[teamName].time,
        points: teams[teamName].points,
        finalScore: calculateFinalScore(teams[teamName].time, teams[teamName].points)
    }));

    // Sort by final score descending
    scores.sort((a, b) => b.finalScore - a.finalScore);
    const winner = scores[0];

    const getTeamColor = (teamName) => {
        const colors = {
            A: '#3b82f6',
            B: '#60a5fa',
            C: '#93c5fd',
            D: '#2563eb'
        };
        return colors[teamName] || '#94a3b8';
    };

    return (
        <div className="winner-display">
            <h1 className="winner-title">
                <Trophy size={48} />
                <span>Cognitive Clock - Game Complete!</span>
            </h1>

            <div style={{
                fontSize: '2rem',
                marginBottom: 'var(--spacing-2xl)',
                color: getTeamColor(winner.player),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)'
            }}>
                <Crown size={32} />
                <span>Player {winner.player} Wins!</span>
            </div>

            <div className="scores-table">
                <h3 style={{ marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
                    Final Scores
                </h3>

                {scores.map((score, index) => (
                    <div
                        key={score.team}
                        className={`score-row ${index === 0 ? 'winner' : ''}`}
                    >
                        <div className="score-team" style={{ color: getTeamColor(score.team) }}>
                            {index === 0 && <Crown size={20} />}
                            <span>Player {score.team}</span>
                        </div>
                        <div className="score-details">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={16} />
                                {formatTime(score.time)}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Award size={16} />
                                {score.points} pts
                            </span>
                        </div>
                        <div className="score-final" style={{ '--accent-color': getTeamColor(score.team) }}>
                            {score.finalScore}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                background: 'var(--color-bg-tertiary)',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-xl)',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-sm)'
            }}>
                <Info size={16} />
                <span>Final Score = Remaining Time + (Points × 2)</span>
            </div>

            <button
                className="control-btn"
                style={{
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                    color: 'white',
                    width: '100%',
                    fontSize: '1.25rem',
                    padding: 'var(--spacing-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-sm)'
                }}
                onClick={onRestart}
            >
                <RefreshCw size={24} />
                <span>New Game</span>
            </button>
        </div>
    );
};

export default WinnerDisplay;



