import React from 'react';
import { Clock, Award, Zap, Target, Dice6, X, Lock, Snowflake, AlertTriangle } from 'lucide-react';
import { formatTime } from '../utils/gameLogic';

const TeamCard = ({ team, teamName, isActive, accentColor, accentRgb, showTimePenalty }) => {
    const getTimerClass = () => {
        if (team.eliminated) return 'eliminated';
        if (team.time <= 10) return 'danger';
        if (team.time <= 20) return 'warning';
        return '';
    };

    const getStatusText = () => {
        if (team.eliminated) return 'Eliminated';
        if (team.locked) return 'Locked';
        if (team.frozen) return 'Frozen';
        if (isActive) return 'Active';
        return 'Ready';
    };

    const getStatusClass = () => {
        if (team.eliminated) return 'eliminated';
        if (team.locked) return 'locked';
        if (team.frozen) return 'frozen';
        if (isActive) return 'active';
        return '';
    };

    const getStatusIcon = () => {
        if (team.eliminated) return <AlertTriangle size={16} />;
        if (team.locked) return <Lock size={16} />;
        if (team.frozen) return <Snowflake size={16} />;
        return null;
    };

    return (
        <div
            className={`team-card ${isActive ? 'active' : ''} ${team.locked ? 'locked' : ''} ${team.frozen ? 'frozen' : ''} ${team.eliminated ? 'eliminated' : ''}`}
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

            <div className="team-header">
                <div className="team-name">
                    <span>Team {teamName}</span>
                </div>
                <div className={`team-status ${getStatusClass()}`}>
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
                    {formatTime(team.time)}
                </div>
            </div>

            <div className="points-display">
                <div className="points-label">
                    <Award size={16} />
                    <span>Points</span>
                </div>
                <div className="points-value">{team.points}</div>
            </div>

            {/* Usage Counters */}
            <div className="usage-counters">
                <div className={`counter-item ${team.lifelinesUsed >= team.maxLifelines ? 'exhausted' : ''}`}>
                    <Zap className="counter-icon" size={18} />
                    <span className="counter-label">Lifelines</span>
                    <span className="counter-value">
                        {team.lifelinesUsed} / {team.maxLifelines}
                    </span>
                </div>
                <div className={`counter-item ${team.daresUsed >= team.maxDares ? 'exhausted' : ''}`}>
                    <Target className="counter-icon" size={18} />
                    <span className="counter-label">Dares</span>
                    <span className="counter-value">
                        {team.daresUsed} / {team.maxDares}
                    </span>
                </div>
            </div>

            {team.doubleOrNothing && (
                <div className="team-badges">
                    <div className="badge double-or-nothing">
                        <Dice6 size={16} />
                        <span>Double or Nothing Active</span>
                    </div>
                </div>
            )}

            {team.consecutiveWrong > 0 && (
                <div className="team-badges">
                    <div className="badge" style={{ background: 'var(--color-alert)', color: 'white' }}>
                        <X size={16} />
                        <span>{team.consecutiveWrong} Wrong in a Row</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamCard;
