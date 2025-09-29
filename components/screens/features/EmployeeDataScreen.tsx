import React from 'react';
import PageHeader from '../../common/PageHeader';
import { IdentificationIcon, BuildingOfficeIcon, PhoneIcon, EnvelopeIcon, CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';
import AccessDenied from '../../common/AccessDenied';

const EmployeeDataScreen: React.FC = () => {
    const { user } = useAuth();
    
    if (!user) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <PageHeader title="Employee Data" />
            
             <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex items-center space-x-4">
                    <img src={user.profileImageUrl} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">{user.jobTitle}</p>
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
                     <div>
                        <h4 className="font-semibold mt-4 mb-2 flex items-center"><CheckBadgeIcon className="h-5 w-5 mr-2 text-blue-500" /> Certifications</h4>
                        <ul className="space-y-1 text-sm text-gray-600">
                            {user.certifications.map(cert => (
                                <li key={cert.name}><strong>{cert.name}</strong> (Expires: {cert.expiry})</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDataScreen;