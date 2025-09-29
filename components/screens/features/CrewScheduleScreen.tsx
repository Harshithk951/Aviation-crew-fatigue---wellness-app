import React, { useState, useMemo } from 'react';
import PageHeader from '../../common/PageHeader';
import { CalendarDaysIcon, ClockIcon, MapPinIcon, ExclamationTriangleIcon, UsersIcon, ChevronDownIcon, CheckCircleIcon, ExclamationCircleIcon, ShieldCheckIcon, PencilSquareIcon, ArrowsRightLeftIcon, LightBulbIcon, PlusIcon } from '@heroicons/react/24/outline';
import type { ScheduleEvent, User, ComplianceStatus } from '../../../types';
import { useAuth } from '../../../contexts/AuthContext';
import Modal from '../../common/Modal';

// Form for adding/editing schedule events
const EventForm: React.FC<{
    event: Partial<ScheduleEvent> | null;
    users: User[];
    selectedUserId: string;
    onSave: (event: ScheduleEvent | Partial<ScheduleEvent>) => void;
    onClose: () => void;
}> = ({ event, users, selectedUserId, onSave, onClose }) => {
    
    const initialFormData = event || {
        title: '',
        type: 'flight',
        start: '',
        end: '',
        location: '',
        shiftType: 'Normal',
        userId: selectedUserId
    };
    
    const [formData, setFormData] = useState<Partial<ScheduleEvent>>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const formatDateTimeLocal = (dateString: string | undefined) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      // Adjust for timezone offset
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      const localDate = new Date(date.getTime() - timezoneOffset);
      return localDate.toISOString().slice(0, 16);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">Assign To</label>
                <select name="userId" id="userId" value={formData.userId} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900">
                    {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Event Title</label>
                <input type="text" name="title" id="title" value={formData.title || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                    <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900">
                        <option value="flight">Flight</option>
                        <option value="layover">Layover</option>
                        <option value="training">Training</option>
                        <option value="off">Off</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="shiftType" className="block text-sm font-medium text-gray-700">Shift</label>
                    <select name="shiftType" id="shiftType" value={formData.shiftType} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900">
                        <option>Normal</option>
                        <option>Early Start</option>
                        <option>Late Finish</option>
                        <option>Split Duty</option>
                    </select>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input type="datetime-local" name="start" id="start" value={formatDateTimeLocal(formData.start)} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900" />
                </div>
                <div>
                    <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Time</label>
                    <input type="datetime-local" name="end" id="end" value={formatDateTimeLocal(formData.end)} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900" />
                </div>
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location / Route</label>
                <input type="text" name="location" id="location" value={formData.location || ''} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900" />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-white text-indigo-600 border border-indigo-300 rounded-md hover:bg-indigo-50 font-semibold">Save Event</button>
            </div>
        </form>
    );
};


const ComplianceBadge: React.FC<{ name: string; status: ComplianceStatus; }> = ({ name, status }) => {
    const isCompliant = status.status === 'Compliant';
    return (
        <div className={`flex items-center text-xs p-1 rounded ${isCompliant ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {isCompliant ? <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" /> : <ExclamationCircleIcon className="h-4 w-4 mr-1 text-red-500" />}
            <span className="font-semibold">{name}:</span>
            <span className="ml-1">{status.status}</span>
        </div>
    );
};

const FatigueIndicator: React.FC<{ prediction: ScheduleEvent['fatiguePrediction'] }> = ({ prediction }) => {
    if (!prediction) return null;
    const { risk, score } = prediction;
    const riskColor = risk === 'Low' ? 'text-green-600' : risk === 'Medium' ? 'text-yellow-600' : 'text-red-600';
    return (
        <div className={`flex items-center text-xs font-semibold ${riskColor}`}>
            <LightBulbIcon className="h-4 w-4 mr-1" />
            <span>Fatigue Risk: {risk} ({score})</span>
        </div>
    );
};

const EventCard: React.FC<{ event: ScheduleEvent; isAdminView?: boolean; onEdit: (event: ScheduleEvent) => void; }> = ({ event, isAdminView, onEdit }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const typeClasses = {
        flight: 'border-l-4 border-blue-500', layover: 'border-l-4 border-purple-500',
        training: 'border-l-4 border-yellow-500', off: 'border-l-4 border-gray-400',
    };
    
    const shiftClasses = {
        'Early Start': 'bg-blue-100 text-blue-800', 'Late Finish': 'bg-purple-100 text-purple-800',
        'Split Duty': 'bg-yellow-100 text-yellow-800', 'Normal': 'bg-gray-100 text-gray-800'
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });

    const allCompliance = Object.entries(event.compliance || {});
    const violations = allCompliance.filter(([, s]) => (s as ComplianceStatus).status === 'Violation');

    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${typeClasses[event.type]}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{event.type}</p>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${shiftClasses[event.shiftType]}`}>{event.shiftType}</span>
            </div>
            
            <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p className="flex items-center"><CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-400"/>{formatDate(event.start)}</p>
                <p className="flex items-center"><ClockIcon className="h-4 w-4 mr-2 text-gray-400"/>{formatTime(event.start)} - {formatTime(event.end)}</p>
                <p className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2 text-gray-400"/>{event.location}</p>
            </div>
            
            {event.type === 'flight' && (
                <div className="mt-3 pt-3 border-t space-y-2">
                    <FatigueIndicator prediction={event.fatiguePrediction} />
                    <div className="flex items-center text-sm text-gray-500">
                        <ShieldCheckIcon className="h-4 w-4 mr-2" />
                        <span>Compliance Status</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allCompliance.map(([name, status]) => (
                             <ComplianceBadge key={name} name={name.toUpperCase()} status={status as ComplianceStatus} />
                        ))}
                    </div>
                    {isAdminView && violations.length > 0 && (
                        <div className="p-2 bg-red-50 border-l-4 border-red-400 text-red-700 text-xs rounded-r-md">
                            <p className="font-bold mb-1">Compliance Violations:</p>
                            <ul className="list-disc list-inside">
                                {violations.map(([name, status]) => <li key={name}>{(status as ComplianceStatus).details}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            
             <div className="mt-3 pt-3 border-t">
                <button
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    className="flex justify-between items-center w-full text-sm font-medium text-indigo-500 hover:text-indigo-700"
                >
                    <span>{isDetailsOpen ? 'Hide Details' : 'Show Details'}</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDetailsOpen && event.crew && (
                     <div className="mt-3 space-y-3 text-sm">
                        <div>
                            <div className="flex items-start">
                                <UsersIcon className="h-4 w-4 mr-3 text-gray-400 mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-gray-500">Assigned Crew:</span>
                                    <ul className="mt-1 space-y-1">
                                        {event.crew.map((member, index) => (
                                            <li key={index} className="text-gray-800">
                                                <span className="font-semibold">{member.name}</span> - <span className="text-gray-600">{member.role}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            {isAdminView && event.type !== 'off' && (
                <div className="mt-3 pt-3 border-t flex space-x-2">
                    <button onClick={() => onEdit(event)} className="flex-1 text-sm flex items-center justify-center px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md">
                        <PencilSquareIcon className="h-4 w-4 mr-2" /> Edit / Re-assign
                    </button>
                </div>
            )}
        </div>
    );
};

const CrewScheduleScreen: React.FC = () => {
    const { user, schedule, fullRoster, rosterUsers, addScheduleEvent, updateScheduleEvent } = useAuth();
    const [selectedUserId, setSelectedUserId] = useState<string>(rosterUsers[0]?.id || '');
    const isAdmin = user?.role === 'Admin';
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
    
    const adminSchedule = useMemo(() => {
        return fullRoster.filter(event => event.userId === selectedUserId);
    }, [fullRoster, selectedUserId]);

    const scheduleToDisplay = isAdmin ? adminSchedule : schedule;
    const currentViewUser = isAdmin ? rosterUsers.find(u => u.id === selectedUserId) : user;

    const handleOpenModal = (event: ScheduleEvent | null = null) => {
        setEditingEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingEvent(null);
        setIsModalOpen(false);
    };

    const handleSaveEvent = (eventData: ScheduleEvent | Partial<ScheduleEvent>) => {
        if ('id' in eventData && eventData.id) {
            updateScheduleEvent(eventData as ScheduleEvent);
        } else {
            addScheduleEvent(eventData as Omit<ScheduleEvent, 'id'>);
        }
        handleCloseModal();
    };

    return (
        <div className="space-y-6">
            <PageHeader title="Duty Roster" subtitle={isAdmin ? `Managing schedule for ${currentViewUser?.name || ''}` : "Your upcoming duties and events."} />
            
            {isAdmin && (
                <div className="bg-white p-4 rounded-lg shadow-md flex items-end space-x-4">
                    <div className="flex-1">
                        <label htmlFor="crew-select" className="block text-sm font-medium text-gray-700 mb-1">Select Crew Member to View Roster</label>
                        <select
                            id="crew-select"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                        >
                            {rosterUsers.map(u => <option key={u.id} value={u.id}>{u.name} ({u.jobTitle})</option>)}
                        </select>
                    </div>
                    <button onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 bg-white text-indigo-600 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-50 font-semibold">
                        <PlusIcon className="h-5 w-5 mr-2" /> Add Duty Event
                    </button>
                </div>
            )}
            
            {scheduleToDisplay.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {scheduleToDisplay.map(event => <EventCard key={event.id} event={event} isAdminView={isAdmin} onEdit={handleOpenModal} />)}
                </div>
            ) : (
                <div className="text-center py-16 px-4 bg-white rounded-lg shadow mt-4">
                    <h3 className="text-lg font-medium text-gray-900">No Schedule Found</h3>
                    <p className="mt-1 text-sm text-gray-500">There are no duty events for {currentViewUser?.name || 'this user'}.</p>
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingEvent ? 'Edit Duty Event' : 'Add Duty Event'}>
                <EventForm 
                    event={editingEvent} 
                    users={rosterUsers}
                    selectedUserId={selectedUserId}
                    onSave={handleSaveEvent}
                    onClose={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default CrewScheduleScreen;