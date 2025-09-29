import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { ShieldCheckIcon, UserGroupIcon, UserIcon as PilotIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const Logo: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19L19 12L12 5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 19L12 12L5 5" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const RoleButton: React.FC<{ role: UserRole, icon: React.FC<{className?: string}>, onClick: (role: UserRole) => void }> = ({ role, icon: Icon, onClick }) => {
    return (
        <button
            onClick={() => onClick(role)}
            className="w-full flex items-center space-x-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-200 border border-gray-200"
        >
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Icon className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 text-left">Login as</h3>
                <p className="text-lg font-bold text-indigo-600 text-left">{role}</p>
            </div>
        </button>
    );
}

const LoginScreen: React.FC = () => {
    const { login } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full mx-auto">
                <div className="flex flex-col items-center mb-8">
                    <Logo className="h-16 w-16" />
                    <h1 className="mt-4 text-3xl font-bold text-gray-900 tracking-tight">CrewLink</h1>
                    <p className="mt-2 text-gray-600">Aviation Crew Fatigue & Wellness App</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                    <h2 className="text-center font-semibold text-gray-700">Select a portal to continue</h2>
                    <RoleButton role="Pilot" icon={PilotIcon} onClick={login} />
                    <RoleButton role="Cabin Crew" icon={UserGroupIcon} onClick={login} />
                    <RoleButton role="Ground Staff" icon={BuildingStorefrontIcon} onClick={login} />
                    <RoleButton role="Admin" icon={ShieldCheckIcon} onClick={login} />
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;