import React, { useState } from 'react';
import { Zap, X } from 'lucide-react';

const LifelineDrawer = ({ isOpen, onClose, onApply, drawnLifeline, currentTeam, teams }) => {
    const [selectedTarget, setSelectedTarget] = useState(null);

    if (!isOpen || !drawnLifeline) return null;

    const handleApply = () => {
        if (drawnLifeline) {
            onApply(drawnLifeline, selectedTarget);
            setSelectedTarget(null);
        }
    };

    const getOtherTeams = () => {
        return Object.keys(teams).filter(p => p !== currentTeam);
    };

    const canApply = () => {
        if (!drawnLifeline) return false;
        if (drawnLifeline.requiresTarget && !selectedTarget) return false;
        return true;
    };

    // Get icon component from lifeline
    const IconComponent = drawnLifeline.icon;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <Zap size={24} />
                        <span>Lifeline Drawn</span>
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-content">
                    <div className="lifeline-card selected card-reveal">
                        <div className="lifeline-header">
                            <div className="lifeline-icon">
                                {IconComponent && <IconComponent size={32} />}
                            </div>
                            <div className="lifeline-name">{drawnLifeline.name}</div>
                        </div>
                        <div className="lifeline-description">{drawnLifeline.description}</div>
                    </div>

                    {drawnLifeline.requiresTarget && (
                        <div className="player-selector">
                            <label className="player-selector-label">Select Target Team</label>
                            <div className="player-selector-grid">
                                {getOtherTeams().map((teamName) => (
                                    <button
                                        key={teamName}
                                        className={`player-selector-btn ${selectedTarget === teamName ? 'selected' : ''}`}
                                        style={{
                                            '--accent-color': getTeamColor(teamName)
                                        }}
                                        onClick={() => setSelectedTarget(teamName)}
                                    >
                                        Player {teamName}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal-actions">
                    <button
                        className="control-btn"
                        style={{ background: 'var(--color-bg-tertiary)' }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="control-btn lifeline"
                        onClick={handleApply}
                        disabled={!canApply()}
                    >
                        Apply Lifeline
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper function to get player colors
const getTeamColor = (teamName) => {
    const colors = {
        A: '#3b82f6',
        B: '#60a5fa',
        C: '#93c5fd',
        D: '#2563eb'
    };
    return colors[teamName] || '#94a3b8';
};

export default LifelineDrawer;


