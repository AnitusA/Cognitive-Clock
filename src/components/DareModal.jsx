import React from 'react';
import { Target, X, Check } from 'lucide-react';

const DareModal = ({ isOpen, onClose, onComplete, dare, teamName }) => {
    if (!isOpen || !dare) return null;

    // Get icon component from dare
    const IconComponent = dare.icon;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        <Target size={24} />
                        <span>Dare Challenge</span>
                    </h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-content">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>
                            Player {teamName}
                        </h3>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Complete this dare challenge
                        </p>
                    </div>

                    <div className="dare-content card-reveal">
                        <div className="dare-type">
                            {IconComponent && <IconComponent size={24} />}
                            <span>{dare.type}</span>
                        </div>
                        <div className="dare-description">{dare.description}</div>
                        {dare.hint && (
                            <div className="dare-hint">
                                💡 Hint: {dare.hint}
                            </div>
                        )}
                        {dare.duration && (
                            <div className="dare-hint">
                                ⏱️ Time limit: {dare.duration} seconds
                            </div>
                        )}
                    </div>

                    <div style={{
                        background: 'var(--color-bg-tertiary)',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.875rem',
                        marginTop: 'var(--spacing-md)'
                    }}>
                        ℹ️ Click "Complete Dare" once the player has successfully completed the challenge
                    </div>
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
                        className="control-btn dare"
                        onClick={onComplete}
                    >
                        <Check size={20} />
                        <span>Complete Dare</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DareModal;

