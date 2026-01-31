// Question Shuffler Utility
// Implements category-aware shuffling with rotational pattern

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Map question category to main category group
 * @param {string} category - Original category
 * @returns {string} Main category (Programming, Aptitude, CoreTech)
 */
const mapToMainCategory = (category) => {
    const programmingCategories = [
        'Python',
        'Programming',
        'Computer Science',
        'Programming Concepts'
    ];

    const aptitudeCategories = [
        'Aptitude',
        'Reasoning',
        'Logical Reasoning',
        'Coding-Decoding',
        'Clock Problems'
    ];

    const coreTechCategories = [
        'Data Structures',
        'Algorithms',
        'Computer Architecture',
        'Operating Systems',
        'Web Development',
        'Software Development',
        'Technology'
    ];

    if (programmingCategories.includes(category)) {
        return 'Programming';
    } else if (aptitudeCategories.includes(category)) {
        return 'Aptitude';
    } else if (coreTechCategories.includes(category)) {
        return 'CoreTech';
    }

    // Default to CoreTech if unknown
    return 'CoreTech';
};

/**
 * Shuffle questions with category rotation
 * Pattern: Programming → Aptitude → CoreTech → Programming → ...
 * @param {Array} questions - Array of question objects
 * @returns {Array} Shuffled questions in rotational pattern
 */
export const shuffleQuestionsByCategory = (questions) => {
    // 1. Group questions by main category
    const categories = {
        'Programming': [],
        'Aptitude': [],
        'CoreTech': []
    };

    questions.forEach(question => {
        const mainCategory = mapToMainCategory(question.category);
        categories[mainCategory].push(question);
    });

    // 2. Shuffle within each category
    categories.Programming = shuffleArray(categories.Programming);
    categories.Aptitude = shuffleArray(categories.Aptitude);
    categories.CoreTech = shuffleArray(categories.CoreTech);

    // 3. Interleave categories in rotation, skipping empty ones
    const shuffled = [];
    const nonEmptyCategoryKeys = ['Programming', 'Aptitude', 'CoreTech'].filter(cat => categories[cat].length > 0);
    let categoryIndex = 0;

    // Continue until all categories are exhausted
    while (nonEmptyCategoryKeys.some(cat => categories[cat].length > 0)) {
        const currentCategory = nonEmptyCategoryKeys[categoryIndex % nonEmptyCategoryKeys.length];
        if (categories[currentCategory].length > 0) {
            shuffled.push(categories[currentCategory].shift());
        }
        categoryIndex++;
    }

    return shuffled;
};

/**
 * Get category distribution for debugging
 * @param {Array} questions - Array of question objects
 * @returns {Object} Category counts
 */
export const getCategoryDistribution = (questions) => {
    const distribution = {
        Programming: 0,
        Aptitude: 0,
        CoreTech: 0
    };

    questions.forEach(question => {
        const mainCategory = mapToMainCategory(question.category);
        distribution[mainCategory]++;
    });

    return distribution;
};
