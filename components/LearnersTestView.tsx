
import React, { useState, useEffect, useCallback } from 'react';
import { generateLearnersTestQuestions } from '../services/geminiService';
import type { Question } from '../types';
import Spinner from './Spinner';

type TestState = 'idle' | 'loading' | 'active' | 'results';

const LearnersTestView: React.FC = () => {
    const [testState, setTestState] = useState<TestState>('idle');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const startTest = useCallback(async () => {
        setTestState('loading');
        setError(null);
        try {
            const fetchedQuestions = await generateLearnersTestQuestions(10);
            if (fetchedQuestions.length > 0) {
                setQuestions(fetchedQuestions);
                setCurrentQuestionIndex(0);
                setUserAnswers([]);
                setScore(0);
                setTestState('active');
            } else {
                setError("Could not load questions. Please try again.");
                setTestState('idle');
            }
        } catch (err) {
            setError("Failed to fetch questions. Check your connection or API key.");
            setTestState('idle');
        }
    }, []);
    
    const handleAnswer = (answer: string) => {
        const newAnswers = [...userAnswers, answer];
        setUserAnswers(newAnswers);

        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setTestState('results');
        }
    };

    const restartTest = () => {
        setTestState('idle');
    };

    if (testState === 'idle') {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">K53 Learner's License Practice Test</h1>
                <p className="text-slate-400 mb-8">Test your knowledge with 10 AI-generated questions.</p>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <button onClick={startTest} className="bg-brand-blue hover:bg-brand-green text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Start Test
                </button>
            </div>
        );
    }

    if (testState === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <Spinner />
                <p className="mt-4 text-slate-300">Generating your test questions...</p>
            </div>
        );
    }
    
    if (testState === 'results') {
        const percentage = (score / questions.length) * 100;
        return (
            <div className="bg-slate-800 p-8 rounded-lg max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-center">Test Complete!</h2>
                <p className={`text-5xl font-bold text-center mb-4 ${percentage >= 75 ? 'text-green-400' : 'text-red-400'}`}>
                    {percentage.toFixed(0)}%
                </p>
                <p className="text-xl text-center text-slate-300 mb-8">You answered {score} out of {questions.length} questions correctly.</p>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {questions.map((q, index) => (
                        <div key={index} className={`p-4 rounded-lg ${userAnswers[index] === q.correctAnswer ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                            <p className="font-semibold text-slate-100">{index + 1}. {q.question}</p>
                            <p className="text-sm text-slate-300 mt-1">Your answer: {userAnswers[index]}</p>
                            {userAnswers[index] !== q.correctAnswer && <p className="text-sm text-green-400">Correct answer: {q.correctAnswer}</p>}
                            <p className="text-xs text-slate-400 mt-2"><em>{q.explanation}</em></p>
                        </div>
                    ))}
                </div>
                <button onClick={restartTest} className="mt-8 w-full bg-brand-blue hover:bg-brand-green text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Take Another Test
                </button>
            </div>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-slate-800 p-8 rounded-lg shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-light">Learner's Test</h2>
                    <p className="text-slate-300 font-medium">Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <p className="text-lg text-slate-100 mb-8 min-h-[6rem]">{currentQuestion.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleAnswer(option)}
                            className="w-full text-left p-4 bg-slate-700 rounded-lg hover:bg-brand-blue transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnersTestView;
