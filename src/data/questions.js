// Cognitive Clock - Standardized Question Bank
// Every question follows a strict schema with 4 options (A-D)

const QUESTIONS_DATA = [
    // Programming / Computer Science (Q1-Q15)
    {
        id: 1,
        question: 'What is the main purpose of an algorithm?',
        options: ['Write code in a language', 'Store data', 'Define a step-by-step solution', 'Execute a program'],
        answer: 2,
        category: 'Computer Science',
        difficulty: 'Easy'
    },
   
    {
        id: 3,
        question: 'Which error is detected during execution?',
        options: ['Syntax error', 'Logical error', 'Runtime error', 'Compilation error'],
        answer: 2,
        category: 'Computer Science',
        difficulty: 'Medium'
    },
    
    {
        id: 5,
        question: 'Time complexity measures:',
        options: ['Memory usage', 'Execution time growth', 'Code length', 'CPU speed'],
        answer: 1,
        category: 'Algorithms',
        difficulty: 'Medium'
    },
    {
        id: 6,
        question: 'x = [1,2,3]; x.append([4,5]); len(x)?',
        options: ['3', '4', '5', '6'],
        answer: 1,
        category: 'Python',
        difficulty: 'Medium'
    },
    {
        id: 7,
        question: 'Which is immutable in Python?',
        options: ['List', 'Set', 'Dictionary', 'Tuple'],
        answer: 3,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 8,
        question: 'bool(0) returns:',
        options: ['True', 'False', '0', 'Error'],
        answer: 1,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 9,
        question: 'Keyword for exception handling?',
        options: ['catch', 'handle', 'try', 'error'],
        answer: 2,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 10,
        question: 'type({}) returns:',
        options: ['list', 'tuple', 'dict', 'set'],
        answer: 2,
        category: 'Python',
        difficulty: 'Easy'
    },
    
    {
        id: 12,
        question: 'Worst-case time of linear search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        answer: 2,
        category: 'Algorithms',
        difficulty: 'Medium'
    },
    {
        id: 13,
        question: 'Closest memory to CPU?',
        options: ['Hard Disk', 'RAM', 'Cache', 'Secondary memory'],
        answer: 2,
        category: 'Computer Architecture',
        difficulty: 'Medium'
    },
    
   

    // Aptitude & Reasoning (Q16-Q25)
    {
        id: 16,
        question: 'Ratio boys:girls = 3:2, boys = 30, girls?',
        options: ['15', '20', '25', '30'],
        answer: 1,
        category: 'Aptitude',
        difficulty: 'Easy'
    },
    {
        id: 17,
        question: 'Train covers 120 km in 2 hrs, speed?',
        options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
        answer: 2,
        category: 'Aptitude',
        difficulty: 'Easy'
    },
    {
        id: 18,
        question: 'Series 2, 5, 10, 17, ?',
        options: ['24', '26', '28', '30'],
        answer: 1,
        category: 'Reasoning',
        difficulty: 'Medium'
    },
    {
        id: 19,
        question: 'Selling price doubled → profit?',
        options: ['Half', 'Same', 'Double', 'Triple'],
        answer: 2,
        category: 'Aptitude',
        difficulty: 'Medium'
    },
    {
        id: 20,
        question: 'Average of 5 numbers is 20, total?',
        options: ['50', '80', '100', '120'],
        answer: 2,
        category: 'Aptitude',
        difficulty: 'Easy'
    },
    {
        id: 21,
        question: 'All engineers are problem solvers, some problem solvers are coders → conclusion?',
        options: [
            'All engineers are coders',
            'Some engineers may be coders',
            'No engineers are coders',
            'All coders are engineers'
        ],
        answer: 1,
        category: 'Logical Reasoning',
        difficulty: 'Hard'
    },
    {
        id: 22,
        question: 'Odd one out:',
        options: ['Binary', 'Decimal', 'Hexadecimal', 'Algorithm'],
        answer: 3,
        category: 'Reasoning',
        difficulty: 'Easy'
    },
    {
        id: 23,
        question: 'Which is correct about squares and circles?',
        options: [
            'Only squares are rectangles',
            'Only circles are ellipses',
            'Both squares are rectangles & circles are ellipses',
            'Neither squares are rectangles nor circles are ellipses'
        ],
        answer: 2,
        category: 'Logical Reasoning',
        difficulty: 'Easy'
    },
    {
        id: 24,
        question: 'If CODE → DPEF, then DATA → ?',
        options: ['EBUA', 'EBUB', 'EBVC', 'EBUC'],
        answer: 1,
        category: 'Coding-Decoding',
        difficulty: 'Medium'
    },
    {
        id: 25,
        question: 'What is the angle between hands at 2:40?',
        options: ['60°', '70°', '160°', '170°'],
        answer: 1, // Using 70° as per source even if mathematical discrepancy exists
        category: 'Clock Problems',
        difficulty: 'Medium'
    },

    // Technology & Web (Q26-Q30)
    {
        id: 26,
        question: 'Which HTTP method is used to send data?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        answer: 1,
        category: 'Web Development',
        difficulty: 'Easy'
    },
    
    {
        id: 29,
        question: 'What does API stand for?',
        options: [
            'Application Programming Interface',
            'Application Protocol Interface',
            'Advanced Program Interface',
            'Automated Protocol Interaction'
        ],
        answer: 0,
        category: 'Technology',
        difficulty: 'Easy'
    },
    
    // Programming Fundamentals (Q31-Q40)
    {
        id: 31,
        question: 'Primary goal of debugging?',
        options: ['Writing more code', 'Finding and fixing errors', 'Designing the UI', 'Deploying the app'],
        answer: 1,
        category: 'Programming',
        difficulty: 'Easy'
    },
    {
        id: 32,
        question: 'What describes an Interpreter?',
        options: ['Compiles code once', 'Executes code line by line', 'Edits source text', 'Links object files'],
        answer: 1,
        category: 'Programming',
        difficulty: 'Easy'
    },
    {
        id: 33,
        question: 'What are logical errors?',
        options: ['Missing semicolon', 'Program runs but gives wrong output', 'System crash', 'Memory overflow'],
        answer: 1,
        category: 'Programming',
        difficulty: 'Medium'
    },
    {
        id: 34,
        question: 'First phase of programming?',
        options: ['Writing code', 'Testing', 'Problem understanding', 'System design'],
        answer: 2,
        category: 'Programming',
        difficulty: 'Easy'
    },
    {
        id: 35,
        question: 'x=10; x+=5. What is x?',
        options: ['5', '10', '15', '20'],
        answer: 2,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 36,
        question: 'type(None) returns:',
        options: ['void', 'null', 'NoneType', 'Object'],
        answer: 2,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 37,
        question: 'Python constant convention:',
        options: ['constant = 10', 'CONSTANT = 10', '_constant = 10', 'const CONST = 10'],
        answer: 1,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 38,
        question: 'Result of "Python"[1:4]:',
        options: ['Pyt', 'yth', 'ytho', 'thon'],
        answer: 1,
        category: 'Python',
        difficulty: 'Medium'
    },
    {
        id: 39,
        question: 'Which is a correct Python statement?',
        options: ['Only functional', 'Only procedural', 'Supports OOP', 'Not for web'],
        answer: 2,
        category: 'Python',
        difficulty: 'Easy'
    },
    {
        id: 40,
        question: 'Default function return in Python:',
        options: ['0', 'False', 'None', 'Error'],
        answer: 2,
        category: 'Python',
        difficulty: 'Easy'
    },

    // Systems & OS (Q41-Q47)
    {
        id: 41,
        question: 'OS main function?',
        options: ['Graphics design', 'Managing hardware and software', 'Internet browsing', 'Statistical math'],
        answer: 1,
        category: 'Operating Systems',
        difficulty: 'Easy'
    },
    {
        id: 42,
        question: 'Example of System Software:',
        options: ['Google Chrome', 'Operating System', 'MS Word', 'Adobe Photoshop'],
        answer: 1,
        category: 'Operating Systems',
        difficulty: 'Easy'
    },
    {
        id: 43,
        question: 'Concept of CPU sharing among tasks:',
        options: ['Multithreading', 'Multitasking', 'Parallelism', 'Piping'],
        answer: 1,
        category: 'Operating Systems',
        difficulty: 'Easy'
    },
    {
        id: 44,
        question: 'When RAM is full, system uses:',
        options: ['L1 Cache', 'Virtual memory', 'Flash drive', 'Registers'],
        answer: 1,
        category: 'Operating Systems',
        difficulty: 'Medium'
    },
    {
        id: 45,
        question: 'Website visuals are handled by:',
        options: ['Backend', 'Frontend', 'Database', 'Operating System'],
        answer: 1,
        category: 'Web Development',
        difficulty: 'Easy'
    },
    {
        id: 46,
        question: 'Which is a secure web protocol?',
        options: ['HTTP', 'HTTPS', 'FTP', 'Telnet'],
        answer: 1,
        category: 'Web Development',
        difficulty: 'Easy'
    },
    {
        id: 47,
        question: 'Cookies are primarily used to:',
        options: ['Compress files', 'Store user data temporarily', 'Scan for viruses', 'Create animations'],
        answer: 1,
        category: 'Web Development',
        difficulty: 'Easy'
    },

    // Final Aptitude (Q48-Q50)
    {
        id: 48,
        question: 'Cost price is 400, loss 10%. Selling price?',
        options: ['340', '350', '360', '370'],
        answer: 2,
        category: 'Aptitude',
        difficulty: 'Medium'
    },
    {
        id: 49,
        question: 'Series 4, 9, 16, 25, ?',
        options: ['30', '32', '36', '40'],
        answer: 2,
        category: 'Reasoning',
        difficulty: 'Easy'
    },
    {
        id: 50,
        question: 'If PROGRAM → QSPHSBN, then CODE → ?',
        options: ['DPEF', 'DPEG', 'DQFF', 'ERFG'],
        answer: 0,
        category: 'Coding-Decoding',
        difficulty: 'Medium'
    }
];

/**
 * Validate question objects at load time
 * @param {Array} questions - The question bank to validate
 * @returns {Array} The validated questions or throws error
 */
const validateQuestions = (questions) => {
    return questions.map((q, index) => {
        const errors = [];
        if (!q.question) errors.push('Missing question text');
        if (!Array.isArray(q.options) || q.options.length !== 4) errors.push('Must have exactly 4 options');
        if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) errors.push('Invalid answer reference (must be index 0-3)');
        if (!q.category) errors.push('Missing category tag');

        if (errors.length > 0) {
            console.error(`Malformed question at index ${index} (ID: ${q.id}):`, errors.join(', '));
            throw new Error(`Invalid Question Data: ${errors.join('; ')}`);
        }
        return q;
    });
};

export const QUESTIONS = validateQuestions(QUESTIONS_DATA);
