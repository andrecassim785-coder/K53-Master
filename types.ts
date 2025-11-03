
export type View = 'dashboard' | 'learners' | 'drivers' | 'chatbot' | 'progress' | 'profile';

export interface Question {
  question: string;
  image?: string; // Optional field for base64 encoded image
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface TelemetryPoint {
  time: number;
  speed: number;
  steeringAngle: number;
  brake: number; // 0 to 1
  accelerator: number; // 0 to 1
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}