import React, { useState, useMemo } from 'react';
import PageHeader from '../../common/PageHeader';
import { MOCK_PASSENGER_REQUESTS } from '../../../constants';

type StatusFilter = 'All' | 'Pending' | 'Completed';

const PassengerServicesScreen: React.FC = () => {
  const [filter, setFilter] = useState<StatusFilter>('All');

  const filteredRequests = useMemo(() => {
    if (filter === 'All') return MOCK_PASSENGER_REQUESTS;
    return MOCK_PASSENGER_REQUESTS.filter(req => req.status === filter);
  }, [filter]);

  const getStatusChipClass = (status: 'Pending' | 'Completed') => {
    return status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Passenger Services" subtitle="Manage special passenger requests." />
      
      <div className="flex space-x-2">
        {(['All', 'Pending', 'Completed'] as StatusFilter[]).map(status => (
            <button 
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 text-sm font-medium rounded-full ${filter === status ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
                {status}
            </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredRequests.map(req => (
          <div key={req.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Seat {req.seat} - {req.type}</p>
              <p className="text-sm text-gray-600">{req.request}</p>
            </div>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusChipClass(req.status as 'Pending' | 'Completed')}`}>
                {req.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengerServicesScreen;