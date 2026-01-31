import React, { useState } from 'react';
import { Play, Check, X, Zap, Target, Flag, Lock, Unlock, AlertTriangle, LifeBuoy } from 'lucide-react';
import { getFallbackOptions } from '../utils/eliminationLogic';

const ControlPanel = ({
    activeTeam,
    teams,
    onAssignQuestion,
    onCorrectAnswer,
    onWrongAnswer,
    onLifeline,
    onDare,
    onUnlockTeam,
    onFallbackLifeline,
    onFallbackDare,
    onEliminate,
    onEndGame
}) => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleAssign = () => {
        if (selectedTeam) {
            onAssignQuestion(selectedTeam);
        }
    };

    const isTeamDisabled = (teamName) => {
        return teams[teamName].locked || teams[teamName].frozen || teams[teamName].eliminated;
    };

    const canUseLifeline = (teamName) => {
        const player = teams[teamName];
        return player && player.lifelinesUsed < player.maxLifelines && !player.locked && !player.eliminated;
    };

    const canUseDare = (teamName) => {
        const player = teams[teamName];
        return player && player.daresUsed < player.maxDares && !player.eliminated;
    };

    // Get teams with fallback available
    const teamsWithFallback = Object.keys(teams).filter(
        teamName => teams[teamName].fallbackAvailable && teams[teamName].timeoutOccurred
    );

    return (
        <div className="control-panel">
            <h2 className="control-title">Cognitive Clock Controls</h2>

            {/* Fallback Options Section */}
            {teamsWithFallback.length > 0 && (
                <div className="fallback-section">
                    <div className="fallback-header">
                        <AlertTriangle size={20} />
                        <span>Timeout Recovery Options</span>
                    </div>
                    {teamsWithFallback.map(teamName => {
                        const fallbackOpts = getFallbackOptions(teams[teamName]);
                        return (
                            <div key={teamName} className="fallback-team">
                                <div className="fallback-team-name">
                                    <LifeBuoy size={18} />
                                    <span>Team {teamName} - Timer Expired</span>
                                </div>
                                <div className="fallback-options">
                                    <button
                                        className="fallback-btn"
                                        onClick={() => onFallbackLifeline(teamName)}
                                        disabled={!fallbackOpts.canUseLifeline}
                                    >
                                        <Zap size={18} />
                                        <span>Use Lifeline</span>
                                        <span className="fallback-count">
                                            ({fallbackOpts.remainingLifelines} left)
                                        </span>
                                    </button>
                                    <button
                                        className="fallback-btn"
                                        onClick={() => onFallbackDare(teamName)}
                                        disabled={!fallbackOpts.canUseDare}
                                    >
                                        <Target size={18} />
                                        <span>Use Dare</span>
                                        <span className="fallback-count">
                                            ({fallbackOpts.remainingDares} left)
                                        </span>
                                    </button>
                                    <button
                                        className="fallback-btn eliminate"
                                        onClick={() => onEliminate(teamName)}
                                    >
                                        <Lock size={18} />
                                        <span>Eliminate</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {!activeTeam && (
                <>
                    <div className="team-selector">
                        <label className="team-selector-label">Select Team to Assign Question</label>
                        <div className="team-selector-grid">
                            {Object.keys(teams).map((teamName) => (
                                <button
                                    key={teamName}
                                    className={`team-selector-btn ${selectedTeam === teamName ? 'selected' : ''}`}
                                    style={{
                                        '--accent-color': getTeamColor(teamName)
                                    }}
                                    onClick={() => setSelectedTeam(teamName)}
                                    disabled={isTeamDisabled(teamName)}
                                >
                                    Team {teamName}
                                    {isTeamDisabled(teamName) && <Lock size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="control-grid">
                        <button
                            className="control-btn assign"
                            onClick={handleAssign}
                            disabled={!selectedTeam}
                        >
                            <Play size={20} />
                            <span>Assign Question</span>
                        </button>
                    </div>
                </>
            )}

            {activeTeam && (
                <>
                    <div className="team-selector">
                        <label className="team-selector-label">
                            Question assigned to Team {activeTeam}
                        </label>
                    </div>

                    <div className="control-grid">
                        <button
                            className="control-btn correct"
                            onClick={onCorrectAnswer}
                        >
                            <Check size={20} />
                            <span>Correct Answer</span>
                        </button>

                        <button
                            className="control-btn wrong"
                            onClick={onWrongAnswer}
                        >
                            <X size={20} />
                            <span>Wrong Answer</span>
                        </button>

                        <button
                            className="control-btn lifeline"
                            onClick={onLifeline}
                            disabled={!canUseLifeline(activeTeam)}
                        >
                            <Zap size={20} />
                            <span>Draw Lifeline</span>
                            {teams[activeTeam] && (
                                <span className="usage-badge">
                                    {teams[activeTeam].lifelinesUsed}/{teams[activeTeam].maxLifelines}
                                </span>
                            )}
                        </button>

                        <button
                            className="control-btn dare"
                            onClick={onDare}
                            disabled={!canUseDare(activeTeam)}
                        >
                            <Target size={20} />
                            <span>Trigger Dare</span>
                            {teams[activeTeam] && (
                                <span className="usage-badge">
                                    {teams[activeTeam].daresUsed}/{teams[activeTeam].maxDares}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Manual Unlock Button */}
                    {teams[activeTeam]?.locked && !teams[activeTeam]?.eliminated && (
                        <div className="control-grid" style={{ marginTop: 'var(--spacing-md)' }}>
                            <button
                                className="control-btn unlock"
                                onClick={() => onUnlockTeam(activeTeam)}
                            >
                                <Unlock size={20} />
                                <span>Unlock Team (Host Override)</span>
                            </button>
                        </div>
                    )}
                </>
            )}

            <div className="control-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
                <button
                    className="control-btn end-game"
                    onClick={onEndGame}
                >
                    <Flag size={20} />
                    <span>End Game</span>
                </button>
            </div>
        </div>
    );
};

// Helper function to get player colors (dark blue theme only)
const getTeamColor = (teamName) => {
    const colors = {
        A: '#3b82f6',
        B: '#60a5fa',
        C: '#93c5fd',
        D: '#2563eb'
    };
    return colors[teamName] || '#94a3b8';
};

export default ControlPanel;


