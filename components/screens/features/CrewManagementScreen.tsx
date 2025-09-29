import React, { useState, useMemo } from 'react';
import PageHeader from '../../common/PageHeader';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';
import Modal from '../../common/Modal';
import type { User, UserRole } from '../../../types';

// Form component for adding/editing crew members
const CrewMemberForm: React.FC<{
    member: Partial<User> | null;
    onSave: (member: User | Partial<User>) => void;
    onClose: () => void;
}> = ({ member, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<User>>(
        member || { name: '', jobTitle: '', role: 'Pilot', status: 'Active' }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-600">Job Title</label>
                <input type="text" name="jobTitle" id="jobTitle" value={formData.jobTitle || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-600">Role</label>
                <select name="role" id="role" value={formData.role || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                    <option>Pilot</option>
                    <option>Cabin Crew</option>
                    <option>Ground Staff</option>
                    <option>Admin</option>
                </select>
            </div>
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
                <select name="status" id="status" value={formData.status || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                    <option>Active</option>
                    <option>Standby</option>
                    <option>On Leave</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 font-semibold">Save</button>
            </div>
        </form>
    );
};


const CrewManagementScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { user, rosterUsers, addCrewMember, updateCrewMember, deleteCrewMember } = useAuth();
    const isAdmin = user?.role === 'Admin';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<User | null>(null);
    const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);

    const filteredCrew = useMemo(() => {
        return rosterUsers.filter(member =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, rosterUsers]);
    
    const getStatusClass = (status: string) => {
        return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
    }

    const handleOpenModal = (member: User | null = null) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingMember(null);
        setIsModalOpen(false);
    };

    const handleSaveMember = (memberData: User | Partial<User>) => {
        if ('id' in memberData && memberData.id) {
            updateCrewMember(memberData as User);
        } else {
            addCrewMember(memberData as Omit<User, 'id' | 'profileImageUrl' | 'employeeId'>);
        }
        handleCloseModal();
    };
    
    const handleDeleteClick = (memberId: string) => {
        setDeletingMemberId(memberId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingMemberId) {
            deleteCrewMember(deletingMemberId);
        }
        setDeleteConfirmOpen(false);
        setDeletingMemberId(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <PageHeader title="Crew Roster" subtitle="View and manage the current flight crew." />
                {isAdmin && (
                    <button onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md shadow hover:bg-indigo-200 font-semibold">
                        <PlusIcon className="h-5 w-5 mr-2" /> Add Crew
                    </button>
                )}
            </div>
            
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search crew by name or role..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full placeholder-gray-400"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCrew.map(member => (
                    <div key={member.employeeId} className="bg-white p-4 rounded-xl shadow text-center relative">
                        {isAdmin && member.id !== user?.id && (
                             <div className="absolute top-2 right-2 flex space-x-1">
                                <button onClick={() => handleOpenModal(member)} className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full">
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDeleteClick(member.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        )}
                        <img src={member.profileImageUrl} alt={member.name} className="h-24 w-24 rounded-full object-cover mx-auto" />
                        <h3 className="mt-4 font-bold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.jobTitle}</p>
                        <span className={`mt-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getStatusClass(member.status)}`}>
                            {member.status}
                        </span>
                    </div>
                ))}
            </div>
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingMember ? 'Edit Crew Member' : 'Add Crew Member'}>
                <CrewMemberForm member={editingMember} onSave={handleSaveMember} onClose={handleCloseModal} />
            </Modal>
            
            <Modal isOpen={isDeleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} title="Confirm Deletion">
                <div className="text-center">
                    <p className="text-gray-700">Are you sure you want to delete this crew member? This action cannot be undone.</p>
                    <div className="mt-6 flex justify-center space-x-4">
                        <button onClick={() => setDeleteConfirmOpen(false)} className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                        <button onClick={handleConfirmDelete} className="px-6 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 font-semibold">Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CrewManagementScreen;