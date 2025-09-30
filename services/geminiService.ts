import { GoogleGenAI, Type } from "@google/genai";
import type { Question, TelemetryPoint, ChatMessage } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock response. Please set your Gemini API key in a .env file.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const mockQuestion: Question = {
    question: "What does this road sign mean?",
    options: ["Stop", "Yield", "No Entry", "Speed Limit"],
    correctAnswer: "No Entry",
    explanation: "This sign indicates that vehicles are not allowed to enter this area."
};

export const generateLearnersTestQuestions = async (count: number): Promise<Question[]> => {
    if (!process.env.API_KEY) {
        return Array(count).fill(mockQuestion);
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate ${count} unique multiple-choice questions for the South African K53 learner's license test. Focus on road signs, rules of the road, and vehicle controls. For each question, provide 4 options, the correct answer, and a brief explanation.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: {
                                        type: Type.ARRAY,
                                        items: { type: Type.STRING }
                                    },
                                    correctAnswer: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer", "explanation"]
                            }
                        }
                    },
                    required: ["questions"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.questions;
    } catch (error) {
        console.error("Error generating learner's test questions:", error);
        throw new Error("Failed to fetch questions from Gemini API.");
    }
};

export const analyzeDrivingSession = async (telemetry: TelemetryPoint[]): Promise<string> => {
    if (!process.env.API_KEY) {
        return "Mock Analysis: The driver showed good control but had instances of harsh braking around the 30-second mark. Speed was generally well-maintained within limits. Steering was smooth through corners.";
    }
    const prompt = `
        You are a K53 driving instructor AI. Analyze the following driving simulator telemetry data.
        The data represents a short driving session with timestamps in seconds.
        'speed' is in km/h.
        'steeringAngle' is in degrees (-180 to 180).
        'brake' and 'accelerator' are from 0 (not pressed) to 1 (fully pressed).
        Provide constructive feedback based on K53 standards. Look for:
        - Harsh braking or acceleration (rapid changes in brake/accelerator values).
        - Exceeding a typical urban speed limit of 60 km/h.
        - Erratic steering.
        - Overall smoothness and control.
        Keep the analysis concise and helpful for a learner driver.
        Data:
        ${JSON.stringify(telemetry.slice(0, 50))}...
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing driving session:", error);
        throw new Error("Failed to get analysis from Gemini API.");
    }
};

export const getChatbotResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
    if (!process.env.API_KEY) {
        return "Mock Response: To perform a three-point turn, you should signal, check your mirrors and blind spots, and then proceed when it is safe to do so. Ensure you do not hit the curb.";
    }
    const formattedHistory = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));
    
    const contents = [...formattedHistory, { role: 'user', parts: [{ text: newMessage }] }];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: "You are a helpful assistant specializing in the South African K53 driving standard. Answer questions clearly and concisely to help learners pass their tests. Do not answer questions unrelated to driving or the K53 standard."
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error getting chatbot response:", error);
        throw new Error("Failed to get response from Gemini API.");
    }
};