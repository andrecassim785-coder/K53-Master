import React, { useState, useEffect, useRef } from 'react';
import { UserIcon, CameraIcon } from './icons/Icons';

const UserProfileView: React.FC = () => {
    const [name, setName] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [saveMessage, setSaveMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const { name, targetDate, profilePicture } = JSON.parse(storedProfile);
            setName(name || '');
            setTargetDate(targetDate || '');
            setProfilePicture(profilePicture || null);
        }
    }, []);

    const handleSave = () => {
        const storedProfile = localStorage.getItem('userProfile');
        const existingProfile = storedProfile ? JSON.parse(storedProfile) : {};
        const userProfile = { ...existingProfile, name, targetDate, profilePicture };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        setSaveMessage('Profile saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-100 mb-8">User Profile</h1>
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center space-y-4 mb-8">
                    <div className="relative">
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center">
                                <UserIcon className="w-16 h-16 text-slate-500" />
                            </div>
                        )}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 bg-brand-blue hover:bg-brand-green text-white rounded-full p-2"
                            aria-label="Change profile picture"
                        >
                            <CameraIcon className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePictureUpload}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="targetDate" className="block text-sm font-medium text-slate-300 mb-2">
                            Target Test Date
                        </label>
                        <input
                            type="date"
                            id="targetDate"
                            value={targetDate}
                            onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-100 focus:ring-2 focus:ring-brand-blue focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                    <button
                        onClick={handleSave}
                        className="bg-brand-blue hover:bg-brand-green text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Save Profile
                    </button>
                    {saveMessage && (
                        <p className="text-green-400 text-sm transition-opacity duration-300">
                            {saveMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfileView;