import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_NOTIFICATIONS } from '../../constants';
import PageHeader from '../common/PageHeader';
import { BellIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import type { Notification } from '../../types';

const NOTIFICATION_ICONS = {
  alert: <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />,
  wellness: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  system: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
  info: <BellIcon className="h-6 w-6 text-gray-500" />,
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    return (
        <li className={`p-4 rounded-lg flex items-start space-x-4 ${notification.read ? 'bg-gray-100' : 'bg-white shadow'}`}>
            <div className="flex-shrink-0 mt-0.5">
                {NOTIFICATION_ICONS[notification.type]}
            </div>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>{notification.title}</h3>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                </div>
                <p className={`mt-1 text-sm ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>{notification.message}</p>
            </div>
            {!notification.read && <div className="h-2.5 w-2.5 bg-indigo-500 rounded-full self-center flex-shrink-0"></div>}
        </li>
    );
};


const NotificationsScreen: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Flight Alerts'>('All');
  const [notifications, setNotifications] = useState([...MOCK_NOTIFICATIONS]);

  useEffect(() => {
    // This effect polls the mutable MOCK_NOTIFICATIONS array to simulate
    // receiving real-time updates from another part of the application.
    const interval = setInterval(() => {
      if (notifications.length !== MOCK_NOTIFICATIONS.length) {
        setNotifications([...MOCK_NOTIFICATIONS]);
      }
    }, 1000); // Check for new notifications every second

    return () => clearInterval(interval);
  }, [notifications.length]);

  const filteredNotifications = useMemo(() => {
    if (filter === 'Flight Alerts') {
      // Filter for 'alert' type notifications that are specifically about flights.
      return notifications.filter(n => n.type === 'alert' && n.title.startsWith('Flight Alert'));
    }
    return notifications;
  }, [notifications, filter]);

  return (
    <div className="space-y-4">
      <PageHeader title="Notifications" subtitle="Stay updated with your latest alerts." />

      <div className="flex space-x-2">
        {(['All', 'Flight Alerts'] as const).map(f => (
            <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border'}`}
            >
                {f}
            </button>
        ))}
      </div>

      {filteredNotifications.length > 0 ? (
        <ul className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationItem key={notif.id} notification={notif} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow mt-4">
          <h3 className="text-lg font-medium text-gray-900">All Clear!</h3>
          <p className="mt-1 text-sm text-gray-500">You have no {filter === 'Flight Alerts' ? 'new flight alerts' : 'notifications'} at this time.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsScreen;