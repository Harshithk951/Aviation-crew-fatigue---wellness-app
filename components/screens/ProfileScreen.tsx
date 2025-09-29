import React from 'react';
import PageHeader from '../common/PageHeader';
import { IdentificationIcon, BuildingOfficeIcon, PhoneIcon, EnvelopeIcon, CheckBadgeIcon, ShieldCheckIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen: React.FC = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <PageHeader title="My Profile" />
                <button
                    onClick={logout}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
                    title="Logout from the application"
                >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2"/>
                    Logout
                </button>
            </div>


            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-center space-x-4">
                    <img src={user.profileImageUrl} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">{user.jobTitle}</p>
                         <p className="text-sm text-indigo-500 font-semibold">{user.role}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
                    <div className="text-gray-700 space-y-3">
                        <p className="flex items-center"><IdentificationIcon className="h-5 w-5 mr-3 text-gray-400"/><strong>ID:</strong> {user.employeeId}</p>
                        <p className="flex items-center"><BuildingOfficeIcon className="h-5 w-5 mr-3 text-gray-400"/><strong>Base:</strong> {user.base}</p>
                        <p className="flex items-center"><PhoneIcon className="h-5 w-5 mr-3 text-gray-400"/><strong>Contact:</strong> {user.contact}</p>
                        <p className="flex items-center"><EnvelopeIcon className="h-5 w-5 mr-3 text-gray-400"/><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Compliance & Certifications</h3>
                    <div>
                        <h4 className="font-semibold mb-2 flex items-center"><ShieldCheckIcon className="h-5 w-5 mr-2 text-green-500" /> Compliance Status</h4>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(user.compliance).map(([agency, status]) => (
                                <span key={agency} className="text-xs font-medium bg-green-100 text-green-800 px-2.5 py-1 rounded-full">{agency}: {status}</span>
                            ))}
                        </div>
                    </div>
                    {user.certifications.length > 0 && (
                        <div>
                            <h4 className="font-semibold mt-4 mb-2 flex items-center"><CheckBadgeIcon className="h-5 w-5 mr-2 text-blue-500" /> Certifications</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                {user.certifications.map(cert => (
                                    <li key={cert.name}><strong>{cert.name}</strong> (Expires: {cert.expiry})</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;