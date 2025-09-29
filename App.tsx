import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import type { ScreenName } from './types';
import LoginScreen from './components/screens/LoginScreen';
import SideNav from './components/SideNav';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import HomeScreen from './components/screens/HomeScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import NotificationsScreen from './components/screens/NotificationsScreen';
import CrewScheduleScreen from './components/screens/features/CrewScheduleScreen';
import WellnessDataScreen from './components/screens/features/WellnessDataScreen';
import EmployeeDataScreen from './components/screens/features/EmployeeDataScreen';
import UserManualsScreen from './components/screens/features/UserManualsScreen';
import PassengerServicesScreen from './components/screens/features/PassengerServicesScreen';
import CrewManagementScreen from './components/screens/features/CrewManagementScreen';
import DutyCalculatorScreen from './components/screens/features/DutyCalculatorScreen';
import ExpenseTrackerScreen from './components/screens/features/ExpenseTrackerScreen';
import HelpSupportScreen from './components/screens/features/HelpSupportScreen';
import SystemAnalyticsScreen from './components/screens/admin/SystemAnalyticsScreen';
import SettingsScreen from './components/screens/admin/SettingsScreen';
import SeeAllScreen from './components/screens/features/SeeAllScreen';
import PlaceholderScreen from './components/screens/PlaceholderScreen';
import { MOCK_NOTIFICATIONS } from './constants';
import AIAssistant from './components/AIAssistant';

const screenMap: { [key in ScreenName]?: React.FC<any> } = {
    'Home': HomeScreen,
    'Profile': ProfileScreen,
    'Notifications': NotificationsScreen,
    'Crew Schedule': CrewScheduleScreen,
    'Wellness Data': WellnessDataScreen,
    'Employee Data': EmployeeDataScreen,
    'User Manuals': UserManualsScreen,
    'Passenger Services': PassengerServicesScreen,
    'Crew Management': CrewManagementScreen,
    'Duty Calculator': DutyCalculatorScreen,
    'Expense Tracker': ExpenseTrackerScreen,
    'Help & Support': HelpSupportScreen,
    'System Analytics': SystemAnalyticsScreen,
    'App Settings': SettingsScreen,
    'See all': SeeAllScreen,
};

const MainApp: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState<ScreenName>('Home');
    const { user } = useAuth();
    const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.filter(n => !n.read).length);

    useEffect(() => {
        const interval = setInterval(() => {
            const newCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
            if (newCount !== unreadCount) {
                setUnreadCount(newCount);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [unreadCount]);

    const handleNavigate = (screen: ScreenName) => {
        setActiveScreen(screen);
    };

    const ActiveScreenComponent = screenMap[activeScreen] || (() => <PlaceholderScreen title={activeScreen} />);

    if (!user) {
        return <LoginScreen />;
    }

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <div className="hidden lg:block">
                <SideNav activeScreen={activeScreen} onNavigate={handleNavigate} />
            </div>

            <div className="flex-1 flex flex-col lg:ml-64">
                <Header onNavigate={handleNavigate} unreadCount={unreadCount} />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <ActiveScreenComponent onNavigate={handleNavigate} />
                    </div>
                </main>
                
                <div className="block lg:hidden">
                    <div className="pb-16" /> {/* Spacer */}
                    <BottomNav activeScreen={activeScreen} onNavigate={handleNavigate} />
                </div>
            </div>

           <AIAssistant />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
    );
};

export default App;