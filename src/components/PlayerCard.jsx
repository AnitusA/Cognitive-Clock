import React from 'react';
import { Clock, Award, Zap, Target, Dice6, X, Lock, Snowflake, AlertTriangle } from 'lucide-react';
import { formatTime } from '../utils/gameLogic';

const PlayerCard = ({ player, playerName, isActive, accentColor, accentRgb, showTimePenalty }) => {
    const getTimerClass = () => {
        if (player.eliminated) return 'eliminated';
        if (player.time <= 10) return 'danger';
        if (player.time <= 20) return 'warning';
        return '';
    };

    const getStatusText = () => {
        if (player.eliminated) return 'Eliminated';
        if (player.locked) return 'Locked';
        if (player.frozen) return 'Frozen';
        if (isActive) return 'Active';
        return 'Ready';
    };

    const getStatusClass = () => {
        if (player.eliminated) return 'eliminated';
        if (player.locked) return 'locked';
        if (player.frozen) return 'frozen';
        if (isActive) return 'active';
        return '';
    };

    const getStatusIcon = () => {
        if (player.eliminated) return <AlertTriangle size={16} />;
        if (player.locked) return <Lock size={16} />;
        if (player.frozen) return <Snowflake size={16} />;
        return null;
    };

    return (
        <div
            className={`player-card ${isActive ? 'active' : ''} ${player.locked ? 'locked' : ''} ${player.frozen ? 'frozen' : ''} ${player.eliminated ? 'eliminated' : ''}`}
            style={{
                '--accent-color': accentColor,
                '--accent-rgb': accentRgb
            }}
        >
            {/* Time Penalty Alert Overlay */}
            {showTimePenalty && (
                <div className="time-penalty-alert">
                    <div className="time-penalty-text">-5s</div>
                </div>
            )}

            <div className="player-header">
                <div className="player-name">
                    <span>Player {playerName}</span>
                </div>
                <div className={`player-status ${getStatusClass()}`}>
                    {getStatusIcon()}
                    <span>{getStatusText()}</span>
                </div>
            </div>

            <div className="timer-display">
                <div className="timer-label">
                    <Clock size={16} />
                    <span>Time Remaining</span>
                </div>
                <div className={`timer-value ${getTimerClass()}`}>
                    {formatTime(player.time)}
                </div>
            </div>

            <div className="points-display">
                <div className="points-label">
                    <Award size={16} />
                    <span>Points</span>
                </div>
                <div className="points-value">{player.points}</div>
            </div>

            {/* Usage Counters */}
            <div className="usage-counters">
                <div className={`counter-item ${player.lifelinesUsed >= player.maxLifelines ? 'exhausted' : ''}`}>
                    <Zap className="counter-icon" size={18} />
                    <span className="counter-label">Lifelines</span>
                    <span className="counter-value">
                        {player.lifelinesUsed} / {player.maxLifelines}
                    </span>
                </div>
                <div className={`counter-item ${player.daresUsed >= player.maxDares ? 'exhausted' : ''}`}>
                    <Target className="counter-icon" size={18} />
                    <span className="counter-label">Dares</span>
                    <span className="counter-value">
                        {player.daresUsed} / {player.maxDares}
                    </span>
                </div>
            </div>

            {player.doubleOrNothing && (
                <div className="player-badges">
                    <div className="badge double-or-nothing">
                        <Dice6 size={16} />
                        <span>Double or Nothing Active</span>
                    </div>
                </div>
            )}

            {player.consecutiveWrong > 0 && (
                <div className="player-badges">
                    <div className="badge" style={{ background: 'var(--color-alert)', color: 'white' }}>
                        <X size={16} />
                        <span>{player.consecutiveWrong} Wrong in a Row</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerCard;
