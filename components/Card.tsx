
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({ title, icon, description, buttonText }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-white ml-3">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm flex-grow mb-4">{description}</p>
      <button className="mt-auto bg-slate-700 hover:bg-brand-blue text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full">
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
