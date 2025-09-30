
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CarIcon, TestIcon } from './icons/Icons';

const mockTestHistory = [
    { name: 'Test 1', score: 65 },
    { name: 'Test 2', score: 78 },
    { name: 'Test 3', score: 72 },
    { name: 'Test 4', score: 85 },
    { name: 'Test 5', score: 92 },
];

const mockSimulatorSessions = [
    { id: 1, type: 'Urban Driving', duration: '15 mins', feedback: 'Good control, but some instances of harsh braking.', date: 'Yesterday' },
    { id: 2, type: 'Parallel Parking', duration: '5 mins', feedback: 'Excellent maneuver, slightly too far from the curb.', date: '2 days ago' },
    { id: 3, type: 'Highway Driving', duration: '20 mins', feedback: 'Speed was well-maintained. Following distance needs improvement.', date: '4 days ago' },
];

const ProgressView: React.FC = () => {
    const averageScore = mockTestHistory.reduce((acc, item) => acc + item.score, 0) / mockTestHistory.length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">Your Progress Report</h1>
            <p className="text-slate-400 mb-8">Track your performance and identify areas for improvement.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Learner's Test Section */}
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <TestIcon className="w-6 h-6 mr-3 text-brand-green" />
                        Learner's Test Performance
                    </h2>
                    <div className="mb-6 flex items-center justify-around text-center">
                        <div>
                            <p className="text-slate-400 text-sm">Tests Taken</p>
                            <p className="text-3xl font-bold text-white">{mockTestHistory.length}</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Highest Score</p>
                            <p className="text-3xl font-bold text-green-400">{Math.max(...mockTestHistory.map(t => t.score))}%</p>
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Average Score</p>
                            <p className="text-3xl font-bold text-brand-light">{averageScore.toFixed(0)}%</p>
                        </div>
                    </div>
                    <h3 className="text-lg font-medium text-slate-200 mb-2">Score History</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={mockTestHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis domain={[0, 100]} stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                            <Legend />
                            <Line type="monotone" dataKey="score" stroke="#00B4D8" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Simulator Section */}
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <CarIcon className="w-6 h-6 mr-3 text-brand-green" />
                        Simulator History
                    </h2>
                    <ul className="space-y-4">
                        {mockSimulatorSessions.map(session => (
                            <li key={session.id} className="bg-slate-700/50 p-3 rounded-md">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-semibold text-slate-100">{session.type}</p>
                                    <p className="text-xs text-slate-400">{session.date}</p>
                                </div>
                                <p className="text-sm text-slate-300 italic">"{session.feedback}"</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProgressView;
