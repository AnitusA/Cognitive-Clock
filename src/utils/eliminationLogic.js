/**
 * Elimination and Fallback Logic Utilities
 * Centralized validation for timeout events, elimination, and fallback options
 */

/**
 * Check if team can use fallback (has lifelines or dares remaining)
 * @param {Object} team - team state object
 * @returns {boolean} - True if team can use fallback
 */
export const canUseFallback = (team) => {
    if (!team) return false;
    if (!team.timeoutOccurred || !team.fallbackAvailable) return false;

    const hasLifelines = team.lifelinesUsed < team.maxLifelines;
    const hasDares = team.daresUsed < team.maxDares;

    return hasLifelines || hasDares;
};

/**
 * Get fallback options available for team
 * @param {Object} team - team state object
 * @returns {Object} - Available fallback options with counts
 */
export const getFallbackOptions = (team) => {
    if (!team) {
        return {
            canUseLifeline: false,
            canUseDare: false,
            remainingLifelines: 0,
            remainingDares: 0
        };
    }

    const remainingLifelines = Math.max(0, team.maxLifelines - team.lifelinesUsed);
    const remainingDares = Math.max(0, team.maxDares - team.daresUsed);

    return {
        canUseLifeline: remainingLifelines > 0,
        canUseDare: remainingDares > 0,
        remainingLifelines,
        remainingDares
    };
};

/**
 * Check if team should be eliminated
 * @param {Object} team - team state object
 * @returns {boolean} - True if team should be eliminated
 */
export const shouldEliminate = (team) => {
    if (!team) return false;
    if (team.time > 0) return false;
    if (team.eliminated) return true;

    // If timeout occurred and no fallback available, eliminate
    if (team.timeoutOccurred && !canUseFallback(team)) {
        return true;
    }

    return false;
};

/**
 * Handle timeout event and determine next action
 * @param {Object} team - team state object
 * @returns {Object} - Action recommendations
 */
export const handleTimeout = (team) => {
    if (!team) {
        return {
            shouldEliminate: false,
            canUseFallback: false,
            fallbackOptions: { lifelines: 0, dares: 0 }
        };
    }

    const hasLifelines = team.lifelinesUsed < team.maxLifelines;
    const hasDares = team.daresUsed < team.maxDares;

    return {
        shouldEliminate: !hasLifelines && !hasDares,
        canUseFallback: hasLifelines || hasDares,
        fallbackOptions: {
            lifelines: hasLifelines ? team.maxLifelines - team.lifelinesUsed : 0,
            dares: hasDares ? team.maxDares - team.daresUsed : 0
        }
    };
};

/**
 * Check if team is in a critical state (low time, timeout, or eliminated)
 * @param {Object} team - team state object
 * @returns {string} - 'eliminated', 'timeout', 'critical', 'warning', or 'normal'
 */
export const getPlayerCriticalState = (team) => {
    if (!team) return 'normal';
    if (team.eliminated) return 'eliminated';
    if (team.time <= 0) return 'timeout';
    if (team.time <= 10) return 'critical';
    if (team.time <= 20) return 'warning';
    return 'normal';
};

