import React from 'react';
import PageHeader from '../../common/PageHeader';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const SystemAnalyticsScreen: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="System Analytics" subtitle="View system-wide operational data." />
      <div className="flex items-center justify-center min-h-[60vh] p-4 text-center bg-white rounded-xl shadow">
        <div>
          <ChartBarIcon className="w-16 h-16 mx-auto text-indigo-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="mt-2 text-gray-500">This area will contain system-wide analytics, fatigue trend reports, and operational efficiency metrics.</p>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalyticsScreen;
