import React from 'react';
import Carousel from '../Carousel';
import CategoryGrid from '../CategoryGrid';
import { CAROUSEL_ITEMS, CATEGORIES, FLIGHT_CREW_ROLES } from '../../constants';
import type { ScreenName, ScheduleEvent } from '../../types';
import PageHeader from '../common/PageHeader';
import { useFlightStatus } from '../../hooks/useFlightStatus';
import { ClockIcon, MapPinIcon, ExclamationTriangleIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

// Helper to find the next chronological flight that hasn't ended.
const findNextUpcomingFlight = (schedule: ScheduleEvent[]): ScheduleEvent | null => {
    const now = new Date();
    const upcomingFlights = schedule
        .filter(event => event.type === 'flight' && new Date(event.end) > now)
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    
    return upcomingFlights.length > 0 ? upcomingFlights[0] : null;
};


const getStatusColorClasses = (status: string) => {
    switch (status) {
        case 'On Time':
            return 'text-green-600 bg-green-100';
        case 'Delayed':
            return 'text-orange-500 bg-orange-100';
        case 'Boarding':
            return 'text-blue-600 bg-blue-100';
        case 'Departed':
            return 'text-gray-500 bg-gray-100';
        case 'Cancelled':
            return 'text-red-600 bg-red-100';
        default:
            return 'text-gray-700 bg-gray-100';
    }
}

const UpcomingFlightCard: React.FC<{ flight: ScheduleEvent | null }> = ({ flight }) => {
    const flightStatus = useFlightStatus(flight?.flightNumber);
    const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });

    if (!flight) {
        return (
             <div className="bg-white p-4 rounded-xl shadow h-full">
                <h3 className="font-semibold text-gray-800 mb-2">Upcoming Flight</h3>
                <div className="flex items-center text-gray-500">
                    <PaperAirplaneIcon className="h-5 w-5 mr-3" />
                    <p>No upcoming flights on your schedule.</p>
                </div>
            </div>
        )
    }

    const [origin, destination] = flight.location.split(' -> ');

    return (
        <div className="bg-white p-4 rounded-xl shadow h-full">
            <h3 className="font-semibold text-gray-800 mb-2">Upcoming Flight</h3>
            {!flightStatus ? (
                 <div className="text-gray-600 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
            ) : (
                 <div className="text-gray-600 space-y-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-lg text-gray-900">{flight.flightNumber} to {destination}</p>
                            <p className="text-sm">Departure from {origin}</p>
                        </div>
                        <span className={`font-semibold text-sm px-2 py-1 rounded-md ${getStatusColorClasses(flightStatus.status)}`}>
                            {flightStatus.status}
                        </span>
                    </div>
                    <div className="flex items-center text-sm border-t pt-2">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-400"/>
                        <span>Scheduled: {formatTime(flightStatus.departureTime)}</span>
                        <div className="border-l mx-3 h-4"></div>
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-400"/>
                        <span>Gate: <span className="font-bold">{flightStatus.gate || 'TBA'}</span></span>
                    </div>
                    {flightStatus.remarks && (
                        <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-sm flex items-start rounded-r-md">
                           <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0"/>
                           <p>{flightStatus.remarks}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const HomeScreen: React.FC<{ onNavigate: (screen: ScreenName) => void; }> = ({ onNavigate }) => {
  const { user, schedule } = useAuth();
  const nextFlight = findNextUpcomingFlight(schedule);
  const firstName = user?.name.split(' ')[1] || user?.name.split(' ')[0] || 'Crew Member';
  
  const availableCategories = React.useMemo(() => {
    if (!user) return [];
    return CATEGORIES.filter(cat => cat.roles.includes(user.role));
  }, [user]);
  
  const showFlightCard = user && FLIGHT_CREW_ROLES.includes(user.role);

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome, ${firstName}!`} subtitle={`Your ${user?.role} dashboard.`} />
      <Carousel items={CAROUSEL_ITEMS} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <div className="bg-white p-4 rounded-xl shadow h-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
                <CategoryGrid categories={availableCategories} onCategoryClick={onNavigate} />
            </div>
        </div>
        
        {showFlightCard && (
            <div className="lg:col-span-1">
                <UpcomingFlightCard flight={nextFlight} />
            </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;