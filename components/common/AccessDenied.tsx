import React from 'react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface AccessDeniedProps {
    message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4 text-center bg-white rounded-xl shadow">
      <div>
        <ShieldExclamationIcon className="w-16 h-16 mx-auto text-red-400" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Access Denied</h1>
        <p className="mt-2 text-gray-500">
            {message || "You do not have the necessary permissions to view this page."}
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
