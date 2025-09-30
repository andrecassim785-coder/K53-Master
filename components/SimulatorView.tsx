
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TelemetryPoint } from '../types';
import { analyzeDrivingSession } from '../services/geminiService';
import Spinner from './Spinner';

// Generate mock telemetry data
const generateTelemetryData = (): TelemetryPoint[] => {
    const data: TelemetryPoint[] = [];
    let speed = 0;
    let steeringAngle = 0;
    for (let i = 0; i < 120; i++) { // 120 seconds of data
        // Simulate acceleration and braking
        let accelerator = 0;
        let brake = 0;
        if (i > 5 && i < 20) accelerator = Math.random() * 0.5 + 0.2;
        if (i > 30 && i < 35) brake = Math.random() * 0.8 + 0.1; // Harsh brake
        if (i > 40 && i < 60) accelerator = Math.random() * 0.4 + 0.1;
        if (i > 80 && i < 90) accelerator = Math.random() * 0.6 + 0.3; // Speeding up
        if (i > 110) brake = 1; // Coming to a stop

        speed += (accelerator * 5) - (brake * 8) - (speed * 0.01);
        speed = Math.max(0, Math.min(80, speed)); // Cap speed

        // Simulate steering
        if (i > 20 && i < 50) steeringAngle = Math.sin(i / 10) * 30 + (Math.random() - 0.5) * 5;
        else if (i > 70 && i < 100) steeringAngle = -Math.sin(i / 15) * 45 + (Math.random() - 0.5) * 5;
        else steeringAngle *= 0.8;

        data.push({
            time: i,
            speed: parseFloat(speed.toFixed(2)),
            steeringAngle: parseFloat(steeringAngle.toFixed(2)),
            brake: parseFloat(brake.toFixed(2)),
            accelerator: parseFloat(accelerator.toFixed(2)),
        });
    }
    return data;
};


const SimulatorView: React.FC = () => {
    const [telemetryData, setTelemetryData] = useState<TelemetryPoint[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTelemetryData(generateTelemetryData());
    }, []);
    
    const handleGetAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysis('');
        try {
            const result = await analyzeDrivingSession(telemetryData);
            setAnalysis(result);
        } catch (err) {
            setError("Failed to get analysis. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Driver's Simulator Replay</h1>
            <p className="text-slate-400 mb-8">Review your last driving session's telemetry and get AI-powered feedback.</p>

            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-lg font-semibold mb-4">Session Telemetry</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={telemetryData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                        <XAxis dataKey="time" label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} stroke="#94a3b8" />
                        <YAxis yAxisId="left" label={{ value: 'Speed (km/h)', angle: -90, position: 'insideLeft' }} stroke="#34d399" />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Steering (°)', angle: 90, position: 'insideRight' }} stroke="#60a5fa" />
                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#34d399" dot={false} strokeWidth={2} />
                        <Line yAxisId="right" type="monotone" dataKey="steeringAngle" stroke="#60a5fa" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">AI Instructor Analysis</h3>
                    <button onClick={handleGetAnalysis} disabled={isLoading} className="w-full bg-brand-blue hover:bg-brand-green text-white font-bold py-2 px-4 rounded-lg transition-colors mb-4 disabled:bg-slate-600">
                        {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
                    </button>
                    {isLoading && <div className="flex justify-center mt-4"><Spinner /></div>}
                    {error && <p className="text-red-400">{error}</p>}
                    {analysis && (
                        <div className="text-slate-300 whitespace-pre-wrap p-4 bg-slate-900 rounded-md">
                            {analysis}
                        </div>
                    )}
                 </div>
                 <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">Simulator Controls</h3>
                    <div className="space-y-4">
                        <p className="text-slate-400">This panel would typically show live data from a connected device like a Logitech G29 steering wheel.</p>
                         <div className="flex justify-around items-center h-32">
                            <div className="text-center">
                                <p className="text-sm text-slate-400">Steering</p>
                                <p className="text-2xl font-mono">0.0°</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-400">Throttle</p>
                                <div className="w-16 h-4 bg-slate-700 rounded mt-1"><div className="w-1/4 h-full bg-green-500 rounded"></div></div>
                            </div>
                             <div className="text-center">
                                <p className="text-sm text-slate-400">Brake</p>
                                <div className="w-16 h-4 bg-slate-700 rounded mt-1"><div className="w-0 h-full bg-red-500 rounded"></div></div>
                            </div>
                        </div>
                         <button className="w-full bg-slate-600 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed">
                            Start New Live Session
                        </button>
                    </div>
                 </div>
            </div>

        </div>
    );
};

export default SimulatorView;
