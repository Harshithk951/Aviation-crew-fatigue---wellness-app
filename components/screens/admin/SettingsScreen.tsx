import React from 'react';
import PageHeader from '../../common/PageHeader';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const SettingsScreen: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="App Settings" subtitle="Configure application parameters and integrations." />
      <div className="flex items-center justify-center min-h-[60vh] p-4 text-center bg-white rounded-xl shadow">
        <div>
          <Cog6ToothIcon className="w-16 h-16 mx-auto text-indigo-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Application Settings</h2>
          <p className="mt-2 text-gray-500">This area will contain controls for managing notifications, data integrations, and user permissions.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
