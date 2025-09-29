import React, { useState, useMemo } from 'react';
import PageHeader from '../../common/PageHeader';
import { MOCK_MANUALS } from '../../../constants';
import { DocumentArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';

const UserManualsScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const availableManuals = useMemo(() => {
    if (!user) return [];
    return MOCK_MANUALS.filter(manual => manual.roles.includes(user.role));
  }, [user]);

  const filteredManuals = useMemo(() => {
    return availableManuals.filter(manual =>
      manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manual.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableManuals]);

  return (
    <div className="space-y-6">
      <PageHeader title="User Manuals" subtitle="Find operational documents and company policies." />

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search manuals..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredManuals.map(manual => (
            <li key={manual.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{manual.title}</p>
                <p className="text-sm text-gray-500">{manual.category} - Version {manual.version}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600">
                <DocumentArrowDownIcon className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManualsScreen;