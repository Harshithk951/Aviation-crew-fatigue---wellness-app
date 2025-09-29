import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { User, UserRole, ScheduleEvent, Expense, SmartwatchData } from '../types';
import { MOCK_USERS_DATA, INITIAL_ROSTER as MOCK_SCHEDULE_DATA, MOCK_EXPENSES_DATA, MOCK_SMARTWATCH_DATA } from '../constants';


// Conversion rates for mock data
const CONVERSION_RATES = { USD: 83.4, EUR: 90.2, SGD: 61.5, INR: 1 };

interface AuthContextType {
    user: User | null;
    schedule: ScheduleEvent[];
    expenses: Expense[];
    rosterUsers: User[];
    fullRoster: ScheduleEvent[];
    smartwatchData: SmartwatchData | null;
    fatigueRisk: boolean;
    login: (role: UserRole) => void;
    logout: () => void;
    addScheduleEvent: (event: Omit<ScheduleEvent, 'id'>) => void;
    updateScheduleEvent: (event: ScheduleEvent) => void;
    addCrewMember: (member: Omit<User, 'id' | 'profileImageUrl' | 'employeeId' | 'compliance' | 'certifications'>) => void;
    updateCrewMember: (member: User) => void;
    deleteCrewMember: (memberId: string) => void;
    addExpense: (expense: Omit<Expense, 'id' | 'baseAmount'>) => void;
    syncSmartwatch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [rosterUsers, setRosterUsers] = useState<User[]>(MOCK_USERS_DATA);
    const [fullRoster, setFullRoster] = useState<ScheduleEvent[]>(MOCK_SCHEDULE_DATA);
    const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES_DATA);
    const [smartwatchData, setSmartwatchData] = useState<SmartwatchData | null>(MOCK_SMARTWATCH_DATA);
    const [fatigueRisk, setFatigueRisk] = useState(false);

    const login = (role: UserRole) => {
        const userToLogin = rosterUsers.find(u => u.role === role);
        setUser(userToLogin || null);
    };

    const logout = () => {
        setUser(null);
    };

    const addScheduleEvent = (event: Omit<ScheduleEvent, 'id'>) => {
        const newEvent: ScheduleEvent = { ...event, id: `s${Date.now()}` };
        setFullRoster(prev => [...prev, newEvent]);
    };

    const updateScheduleEvent = (updatedEvent: ScheduleEvent) => {
        setFullRoster(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    };

    const addCrewMember = (member: Omit<User, 'id' | 'profileImageUrl' | 'employeeId' | 'compliance' | 'certifications'>) => {
        const newMember: User = {
            ...member,
            id: `u${Date.now()}`,
            employeeId: `EMP${Math.floor(100 + Math.random() * 900)}`,
            profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3',
            compliance: {},
            certifications: [],
        };
        setRosterUsers(prev => [...prev, newMember]);
    };

    const updateCrewMember = (updatedMember: User) => {
        setRosterUsers(prev => prev.map(u => u.id === updatedMember.id ? updatedMember : u));
    };

    const deleteCrewMember = (memberId: string) => {
        setRosterUsers(prev => prev.filter(u => u.id !== memberId));
        setFullRoster(prev => prev.filter(e => e.userId !== memberId));
    };
    
    const addExpense = (expense: Omit<Expense, 'id' | 'baseAmount'>) => {
        const baseAmount = expense.amount * (CONVERSION_RATES[expense.currency] || 1);
        const newExpense: Expense = { ...expense, id: `e${Date.now()}`, baseAmount: Math.round(baseAmount) };
        setExpenses(prev => [newExpense, ...prev]);
    };

    const syncSmartwatch = () => {
        // Simulate fetching new data and updating state
        const newData = { ...MOCK_SMARTWATCH_DATA };
        newData.heartRate = 70 + Math.floor(Math.random() * 15);
        newData.stressLevel = 2 + Math.floor(Math.random() * 4);
        newData.spO2 = 97 + Math.floor(Math.random() * 3);
        setSmartwatchData(newData);

        // Update fatigue risk based on new data
        if (newData.stressLevel > 4 || newData.heartRate > 80) {
            setFatigueRisk(true);
        } else {
            setFatigueRisk(false);
        }
    };

    const schedule = useMemo(() => {
        if (!user) return [];
        return fullRoster.filter(event => event.userId === user.id)
            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }, [user, fullRoster]);
    
    const userExpenses = useMemo(() => {
        // In a real app, expenses would be tied to userId. Here we show all for demo.
        return expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [expenses]);


    const value: AuthContextType = {
        user,
        schedule,
        expenses: userExpenses,
        rosterUsers,
        fullRoster,
        smartwatchData,
        fatigueRisk,
        login,
        logout,
        addScheduleEvent,
        updateScheduleEvent,
        addCrewMember,
        updateCrewMember,
        deleteCrewMember,
        addExpense,
        syncSmartwatch,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};