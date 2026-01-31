import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const QuestionPanel = ({ questions, onQuestionChange }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const currentQuestion = questions[currentIndex];
    const isFirstQuestion = currentIndex === 0;
    const isLastQuestion = currentIndex === questions.length - 1;

    const handlePrevious = () => {
        if (!isFirstQuestion) {
            setCurrentIndex(prev => prev - 1);
            setShowAnswer(false);
            setShowOptions(false);
            onQuestionChange?.(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentIndex(prev => prev + 1);
            setShowAnswer(false);
            setShowOptions(false);
            onQuestionChange?.(currentIndex + 1);
        }
    };

    const handleToggleAnswer = () => {
        setShowAnswer(prev => !prev);
    };

    const handleToggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    // Enable keyboard shortcuts
    useKeyboardShortcuts(handlePrevious, handleNext, handleToggleAnswer, handleToggleOptions, true);

    const renderQuestionContent = () => {
        if (!currentQuestion) return (
            <div className="error-message">
                <AlertTriangle size={24} />
                <p>System Error: Question data missing.</p>
            </div>
        );

        return (
            <div className="question-standard-container">
                <div className="question-text">
                    {currentQuestion.question}
                </div>

                {showOptions ? (
                    <div className="mcq-options">
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={index}
                                className={`mcq-option ${showAnswer && index === currentQuestion.answer ? 'correct' : ''}`}
                            >
                                <span className="mcq-label">{String.fromCharCode(65 + index)}.</span>
                                <span className="mcq-text">{option}</span>
                                {showAnswer && index === currentQuestion.answer && (
                                    <span className="mcq-indicator">✓</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="options-hidden-message">
                        <Eye size={24} />
                        <p>Options hidden. Click "View Options" or press 'O' to reveal.</p>
                    </div>
                )}
            </div>
        );
    };

    const getDifficultyClass = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'difficulty-easy';
            case 'medium':
                return 'difficulty-medium';
            case 'hard':
                return 'difficulty-hard';
            default:
                return '';
        }
    };

    return (
        <div className="question-panel">
            <div className="question-panel-header">
                <h2 className="question-panel-title">Cognitive Clock Questions</h2>
                <div className="question-counter">
                    Question {currentIndex + 1} of {questions.length}
                </div>
            </div>

            <div className="question-card">
                <div className="question-metadata">
                    {currentQuestion.difficulty && (
                        <span className={`metadata-tag ${getDifficultyClass(currentQuestion.difficulty)}`}>
                            {currentQuestion.difficulty}
                        </span>
                    )}
                    {currentQuestion.category && (
                        <span className="metadata-tag category-tag">
                            {currentQuestion.category}
                        </span>
                    )}
                </div>

                <div className="question-content">
                    {renderQuestionContent()}
                </div>

                <div className="question-actions">
                    <button
                        className="control-btn options-toggle"
                        onClick={handleToggleOptions}
                    >
                        {showOptions ? <EyeOff size={20} /> : <Eye size={20} />}
                        <span>{showOptions ? 'Hide Options' : 'View Options'}</span>
                    </button>
                    <button
                        className="control-btn answer-toggle"
                        onClick={handleToggleAnswer}
                    >
                        {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
                        <span>{showAnswer ? 'Hide Answer' : 'View Answer'}</span>
                    </button>
                </div>
            </div>

            <div className="question-navigation">
                <button
                    className="nav-btn nav-previous"
                    onClick={handlePrevious}
                    disabled={isFirstQuestion}
                >
                    ← Previous
                </button>

                <div className="nav-indicator">
                    {currentIndex + 1} / {questions.length}
                </div>

                <button
                    className="nav-btn nav-next"
                    onClick={handleNext}
                    disabled={isLastQuestion}
                >
                    Next →
                </button>
            </div>

            <div className="keyboard-hints">
                <span className="hint">← → Navigate</span>
                <span className="hint">O Toggle Options</span>
                <span className="hint">A Toggle Answer</span>
            </div>
        </div>
    );
};

export default QuestionPanel;
