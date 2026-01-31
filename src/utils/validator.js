/**
 * Validation utility for game actions
 * Enforces usage limits and game rules
 */

/**
 * Validate lifeline usage
 * @param {Object} team - team state
 * @returns {Object} - { valid: boolean, reason?: string }
 */
export const validateLifelineUsage = (team) => {
    if (!team) {
        return { valid: false, reason: 'No team provided' };
    }

    if (team.lifelinesUsed >= team.maxLifelines) {
        return { valid: false, reason: 'Lifeline limit reached' };
    }

    if (team.locked) {
        return { valid: false, reason: 'team is locked' };
    }

    return { valid: true };
};

/**
 * Validate dare usage
 * @param {Object} team - team state
 * @returns {Object} - { valid: boolean, reason?: string }
 */
export const validateDareUsage = (team) => {
    if (!team) {
        return { valid: false, reason: 'No team provided' };
    }

    if (team.daresUsed >= team.maxDares) {
        return { valid: false, reason: 'Dare limit reached' };
    }

    return { valid: true };
};

/**
 * Validate action before execution
 * @param {string} actionType - Type of action ('lifeline' or 'dare')
 * @param {Object} team - team state
 * @returns {Object} - { valid: boolean, reason?: string }
 */
export const validateAction = (actionType, team) => {
    switch (actionType) {
        case 'lifeline':
            return validateLifelineUsage(team);
        case 'dare':
            return validateDareUsage(team);
        default:
            return { valid: true };
    }
};

/**
 * Check if team can use lifeline
 * @param {Object} team - team state
 * @returns {boolean}
 */
export const canUseLifeline = (team) => {
    return team &&
        team.lifelinesUsed < team.maxLifelines &&
        !team.locked;
};

/**
 * Check if team can use dare
 * @param {Object} team - team state
 * @returns {boolean}
 */
export const canUseDare = (team) => {
    return team && team.daresUsed < team.maxDares;
};

/**
 * Get remaining lifelines for team
 * @param {Object} team - team state
 * @returns {number}
 */
export const getRemainingLifelines = (team) => {
    if (!team) return 0;
    return Math.max(0, team.maxLifelines - team.lifelinesUsed);
};

/**
 * Get remaining dares for team
 * @param {Object} team - team state
 * @returns {number}
 */
export const getRemainingDares = (team) => {
    if (!team) return 0;
    return Math.max(0, team.maxDares - team.daresUsed);
};

