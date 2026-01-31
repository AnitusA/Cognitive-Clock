// Game logic utility functions

/**
 * Calculate time update after answer submission
 * @param {number} remainingTime - Current remaining time
 * @param {number} timeTaken - Time taken to answer
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {boolean} isDoubleOrNothing - Whether double or nothing is active
 * @returns {number} New time value
 */
export const calculateTimeUpdate = (remainingTime, timeTaken, isCorrect, isDoubleOrNothing = false) => {
    if (isDoubleOrNothing) {
        if (isCorrect) {
            return Math.min(60, remainingTime - timeTaken + 20);
        } else {
            return Math.max(0, remainingTime - timeTaken - 20);
        }
    }

    if (isCorrect) {
        return Math.min(60, remainingTime - timeTaken + 10);
    } else {
        // Wrong answer: apply -5 second time penalty
        return Math.max(0, remainingTime - timeTaken - 5);
    }
};

/**
 * Calculate points update after answer submission
 * @param {number} currentPoints - Current points
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {boolean} isDoubleOrNothing - Whether double or nothing is active
 * @returns {number} New points value
 */
export const calculatePointsUpdate = (currentPoints, isCorrect, isDoubleOrNothing = false) => {
    if (isDoubleOrNothing) {
        return isCorrect ? currentPoints + 20 : currentPoints;
    }

    // Wrong answers no longer deduct points, only apply time penalty
    return isCorrect ? currentPoints + 10 : currentPoints;
};

/**
 * Calculate final score
 * @param {number} remainingTime - Remaining time in seconds
 * @param {number} points - Total points
 * @returns {number} Final score
 */
export const calculateFinalScore = (remainingTime, points) => {
    return remainingTime + (points * 2);
};

/**
 * Get random lifeline from available lifelines
 * @param {Array} availableLifelines - Array of available lifelines
 * @returns {Object} Random lifeline object
 */
export const getRandomLifeline = (availableLifelines) => {
    if (!availableLifelines || availableLifelines.length === 0) return null;
    return availableLifelines[Math.floor(Math.random() * availableLifelines.length)];
};

/**
 * Check if dare should be triggered
 * @param {Object} player - Player object
 * @returns {boolean} Whether dare should trigger
 */
export const checkDareTrigger = (player) => {
    // Dare triggers on:
    // 1. Timer reaches zero
    // 2. Two consecutive wrong answers
    return player.time <= 0 || player.consecutiveWrong >= 2;
};

/**
 * Format time for display
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
