/**
 * Randomizer utility for managing lifeline and dare pools
 * Implements Fisher-Yates shuffle and pool management with history
 */

/**
 * Fisher-Yates shuffle algorithm for unbiased randomization
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled copy of array
 */
export const fisherYatesShuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Create a new randomized pool from items
 * @param {Array} items - Source items
 * @returns {Object} - Pool object with available, drawn, and history arrays
 */
export const createRandomPool = (items) => {
    return {
        available: fisherYatesShuffle(items),
        drawn: [],
        history: []
    };
};

/**
 * Draw one item from the pool
 * @param {Object} pool - Current pool state
 * @returns {Object} - { item, updatedPool }
 */
export const drawFromPool = (pool) => {
    if (pool.available.length === 0) {
        return { item: null, updatedPool: pool };
    }

    // Draw the first item from shuffled pool
    const [drawnItem, ...remaining] = pool.available;

    // Update history (keep last 3 items)
    const newHistory = [...pool.history, drawnItem].slice(-3);

    // Reshuffle remaining items
    const reshuffled = fisherYatesShuffle(remaining);

    const updatedPool = {
        available: reshuffled,
        drawn: [...pool.drawn, drawnItem],
        history: newHistory
    };

    return { item: drawnItem, updatedPool };
};

/**
 * Check if pool should be reset (exhausted)
 * @param {Object} pool - Current pool state
 * @returns {boolean}
 */
export const shouldResetPool = (pool) => {
    return pool.available.length === 0;
};

/**
 * Reset pool with all items, excluding recent history
 * @param {Array} allItems - All available items
 * @param {Array} history - Recent history to exclude
 * @returns {Object} - New pool object
 */
export const resetPoolWithHistory = (allItems, history = []) => {
    // Filter out items in history
    const availableItems = allItems.filter(
        item => !history.some(histItem => histItem.id === item.id)
    );

    // If filtering removed all items, use all items (edge case)
    const itemsToShuffle = availableItems.length > 0 ? availableItems : allItems;

    return {
        available: fisherYatesShuffle(itemsToShuffle),
        drawn: [],
        history: history.slice(-3) // Maintain history
    };
};

/**
 * Draw from pool with automatic reset if exhausted
 * @param {Object} pool - Current pool state
 * @param {Array} allItems - All items for reset
 * @returns {Object} - { item, updatedPool }
 */
export const drawWithAutoReset = (pool, allItems) => {
    // Check if pool needs reset
    if (shouldResetPool(pool)) {
        const resetPool = resetPoolWithHistory(allItems, pool.history);
        return drawFromPool(resetPool);
    }

    return drawFromPool(pool);
};

/**
 * Get pool statistics for debugging
 * @param {Object} pool - Current pool state
 * @returns {Object} - Statistics
 */
export const getPoolStats = (pool) => {
    return {
        availableCount: pool.available.length,
        drawnCount: pool.drawn.length,
        historyCount: pool.history.length,
        historyItems: pool.history.map(item => item.id || item.name)
    };
};
