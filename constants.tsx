import {
    HomeIcon,
    MagnifyingGlassIcon,
    BellIcon,
    UserCircleIcon,
    CalendarDaysIcon,
    HeartIcon,
    BriefcaseIcon,
    BookOpenIcon,
    UsersIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    QuestionMarkCircleIcon,
    Squares2X2Icon,
    CalculatorIcon,
    CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

// Fix: Add User, ScheduleEvent, and Expense to the type imports
import type { NavItem, Category, CarouselItem, Notification, Manual, PassengerRequest, FAQ, UserRole, SleepRecord, Workout, MindfulnessSession, MedicalReminder, SmartwatchData, WellnessAlert, User, ScheduleEvent, Expense } from './types';

// Re-exporting icons for use in useSearch hook
export { CalendarDaysIcon as CalendarIcon, HeartIcon, BriefcaseIcon, BookOpenIcon as FileTextIcon, ChartBarIcon as BarChart2Icon, UsersIcon, QuestionMarkCircleIcon, CalculatorIcon, CurrencyRupeeIcon };

export const NAV_ITEMS: NavItem[] = [
    { name: 'Home', icon: HomeIcon, roles: ['Pilot', 'Cabin Crew', 'Ground Staff', 'Admin'] },
    { name: 'Expense Tracker', icon: CurrencyRupeeIcon, roles: ['Pilot', 'Cabin Crew'] },
    { name: 'Profile', icon: UserCircleIcon, roles: ['Pilot', 'Cabin Crew', 'Ground Staff', 'Admin'] },
];

export const FLIGHT_CREW_ROLES: UserRole[] = ['Pilot', 'Cabin Crew'];

export const CATEGORIES: Category[] = [
    { name: 'Crew Schedule', icon: CalendarDaysIcon, roles: ['Pilot', 'Cabin Crew', 'Admin'] },
    { name: 'Wellness Data', icon: HeartIcon, roles: ['Pilot', 'Cabin Crew'] },
    { name: 'Employee Data', icon: BriefcaseIcon, roles: ['Pilot', 'Cabin Crew', 'Ground Staff'] },
    { name: 'User Manuals', icon: BookOpenIcon, roles: ['Pilot', 'Cabin Crew', 'Ground Staff', 'Admin'] },
    { name: 'Passenger Services', icon: UsersIcon, roles: ['Cabin Crew', 'Ground Staff'] },
    { name: 'Crew Management', icon: UsersIcon, roles: ['Admin'] },
    { name: 'Duty Calculator', icon: CalculatorIcon, roles: ['Pilot', 'Cabin Crew'] },
    { name: 'Help & Support', icon: QuestionMarkCircleIcon, roles: ['Pilot', 'Cabin Crew', 'Ground Staff', 'Admin'] },
    { name: 'System Analytics', icon: ChartBarIcon, roles: ['Admin'] },
    { name: 'App Settings', icon: Cog6ToothIcon, roles: ['Admin'] },
    { name: 'See all', icon: Squares2X2Icon, roles: ['Pilot', 'Cabin Crew', 'Ground Staff', 'Admin'] },
];

// A function to generate a placeholder SVG URL.
// This ensures images always load and are not dependent on external network requests.
const generatePlaceholderImageUrl = (width: number, height: number, text: string): string => {
    const svg = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#e0e7ff" />
            <text x="50%" y="50%" font-family="sans-serif" font-size="40" fill="#6366f1" text-anchor="middle" dy=".3em" font-weight="bold">${text}</text>
        </svg>
    `.trim();
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};


export const CAROUSEL_ITEMS: CarouselItem[] = [
    { id: 1, imageUrl: generatePlaceholderImageUrl(1200, 400, 'Fly High'), alt: 'Airplane wing in the clouds' },
    { id: 2, imageUrl: generatePlaceholderImageUrl(1200, 400, 'Stay Safe'), alt: 'Pilots in a cockpit' },
    { id: 3, imageUrl: generatePlaceholderImageUrl(1200, 400, 'Rest Well'), alt: 'Airport terminal' },
];

export let MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'wellness', title: 'Wellness Check-in', message: 'You have a wellness survey due today. Please complete it to update your fatigue score.', timestamp: '1h ago', read: false },
    { id: 2, type: 'alert', title: 'Flight Alert: DL287', message: 'Gate change for flight DL287. New gate is D15.', timestamp: '3h ago', read: false },
    { id: 3, type: 'system', title: 'App Update', message: 'Version 2.1 is now available with new features and bug fixes.', timestamp: '1d ago', read: true },
    { id: 4, type: 'info', title: 'Training Reminder', message: 'Your recurrent training is scheduled for next week.', timestamp: '2d ago', read: true },
];

export const MOCK_MANUALS: Manual[] = [
    { id: 1, title: 'A320neo Flight Crew Operating Manual', category: 'Aircraft Manuals', version: '3.4', roles: ['Pilot', 'Admin'] },
    { id: 2, title: 'Cabin Emergency Procedures', category: 'Safety Protocols', version: '2.1', roles: ['Cabin Crew', 'Pilot'] },
    { id: 3, title: 'Ground Operations Manual', category: 'Operations', version: '5.0', roles: ['Ground Staff', 'Admin'] },
    { id: 4, title: 'Company Policy Handbook', category: 'Policies', version: '1.8', roles: ['Pilot', 'Cabin Crew', 'Ground Staff', 'Admin'] },
];

export const MOCK_PASSENGER_REQUESTS: PassengerRequest[] = [
    { id: 1, seat: '14A', type: 'Wheelchair Assistance', request: 'Passenger requires wheelchair to gate.', status: 'Pending' },
    { id: 2, seat: '3B', type: 'Special Meal', request: 'Vegetarian, gluten-free meal required.', status: 'Completed' },
    { id: 3, seat: '22C', type: 'Unaccompanied Minor', request: 'Handover to guardian at destination.', status: 'Pending' },
];

export const MOCK_FAQS: FAQ[] = [
    { q: 'How do I report a fatigue event?', a: 'Navigate to the Wellness Data screen and tap on "Report Fatigue Event". Fill in the required details about your sleep and duty period.' },
    { q: 'Where can I find my next flight details?', a: 'Your next flight is displayed on the Home screen. For your full schedule, visit the Crew Schedule screen.' },
    { q: 'How do I update my contact information?', a: 'Contact information can be updated through the main HR portal. This app only displays the data.' },
];

// Fix: Add MOCK_USERS_DATA to provide user information for the application.
export const MOCK_USERS_DATA: User[] = [
    {
        id: 'u1',
        name: 'Capt. Arjun Singh',
        role: 'Pilot',
        jobTitle: 'Captain, A320neo',
        employeeId: 'EMP101',
        base: 'Delhi (DEL)',
        contact: '+91 98765 43210',
        email: 'arjun.singh@crewlink.com',
        profileImageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3',
        status: 'Active',
        compliance: { DGCA: 'Compliant', FAA: 'Compliant' },
        certifications: [
            { name: 'A320 Type Rating', expiry: '2025-06-30' },
            { name: 'Class 1 Medical', expiry: '2024-12-31' },
        ],
    },
    {
        id: 'u2',
        name: 'Priya Sharma',
        role: 'Cabin Crew',
        jobTitle: 'Cabin Crew Supervisor',
        employeeId: 'EMP202',
        base: 'Mumbai (BOM)',
        contact: '+91 91234 56789',
        email: 'priya.sharma@crewlink.com',
        profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3',
        status: 'Active',
        compliance: { DGCA: 'Compliant' },
        certifications: [
            { name: 'Safety & Emergency Procedures', expiry: '2025-01-15' },
            { name: 'First Aid Training', expiry: '2024-11-20' },
        ],
    },
    {
        id: 'u3',
        name: 'Rohan Verma',
        role: 'Ground Staff',
        jobTitle: 'Operations Manager',
        employeeId: 'EMP303',
        base: 'Delhi (DEL)',
        contact: '+91 99887 76655',
        email: 'rohan.verma@crewlink.com',
        profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3',
        status: 'Active',
        compliance: { DGCA: 'Compliant' },
        certifications: [
            { name: 'Dangerous Goods Handling', expiry: '2025-03-10' },
        ],
    },
    {
        id: 'u4',
        name: 'Admin User',
        role: 'Admin',
        jobTitle: 'System Administrator',
        employeeId: 'EMP001',
        base: 'Headquarters',
        contact: '+91 90000 00001',
        email: 'admin@crewlink.com',
        profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3',
        status: 'Active',
        compliance: { DGCA: 'N/A' },
        certifications: [],
    },
];

// Fix: Add INITIAL_ROSTER to provide schedule data for the application.
export const INITIAL_ROSTER: ScheduleEvent[] = [
    // Pilot Schedule (u1)
    {
        id: 's1', userId: 'u1', type: 'flight', title: 'Delhi to JFK', start: '2024-08-05T12:00:00Z', end: '2024-08-06T04:00:00Z',
        location: 'DEL -> JFK', flightNumber: 'AI101', shiftType: 'Late Finish',
        compliance: { DGCA: { status: 'Compliant', details: 'Within FDP limits' }, FAA: { status: 'Compliant', details: 'Within Part 117 limits' } },
        fatiguePrediction: { risk: 'High', score: 85 },
        crew: [{ name: 'Capt. Arjun Singh', role: 'Pilot' }, { name: 'Priya Sharma', role: 'Cabin Crew' }]
    },
    {
        id: 's2', userId: 'u1', type: 'layover', title: 'Layover in New York', start: '2024-08-06T04:00:01Z', end: '2024-08-07T12:00:00Z',
        location: 'New York, USA', shiftType: 'Normal',
    },
    {
        id: 's3', userId: 'u1', type: 'flight', title: 'JFK to Delhi', start: '2024-08-07T12:00:01Z', end: '2024-08-08T04:00:00Z',
        location: 'JFK -> DEL', flightNumber: 'AI102', shiftType: 'Late Finish',
        compliance: { DGCA: { status: 'Violation', details: 'Insufficient rest period before duty' }, FAA: { status: 'Compliant', details: 'Within Part 117 limits' } },
        fatiguePrediction: { risk: 'High', score: 92 },
        crew: [{ name: 'Capt. Arjun Singh', role: 'Pilot' }, { name: 'Priya Sharma', role: 'Cabin Crew' }]
    },
     {
        id: 's4', userId: 'u1', type: 'off', title: 'Day Off', start: '2024-08-09T00:00:00Z', end: '2024-08-09T23:59:59Z',
        location: 'Home Base', shiftType: 'Normal',
    },
    // Cabin Crew Schedule (u2)
    {
        id: 's5', userId: 'u2', type: 'flight', title: 'Mumbai to Dubai', start: '2024-08-14T02:15:00Z', end: '2024-08-14T06:00:00Z',
        location: 'BOM -> DXB', flightNumber: 'EK511', shiftType: 'Early Start',
        compliance: { DGCA: { status: 'Compliant', details: 'Within FDP limits' } },
        fatiguePrediction: { risk: 'Medium', score: 65 },
        crew: [{ name: 'Capt. Rohan Mehra', role: 'Pilot' }, { name: 'Priya Sharma', role: 'Cabin Crew' }]
    },
     {
        id: 's6', userId: 'u2', type: 'layover', title: 'Layover in Dubai', start: '2024-08-14T06:00:01Z', end: '2024-08-15T08:00:00Z',
        location: 'Dubai, UAE', shiftType: 'Normal',
    },
     {
        id: 's7', userId: 'u2', type: 'flight', title: 'Dubai to Mumbai', start: '2024-08-15T08:00:01Z', end: '2024-08-15T12:00:00Z',
        location: 'DXB -> BOM', flightNumber: 'EK512', shiftType: 'Normal',
        compliance: { DGCA: { status: 'Compliant', details: 'Within FDP limits' } },
        fatiguePrediction: { risk: 'Low', score: 40 },
        crew: [{ name: 'Capt. Rohan Mehra', role: 'Pilot' }, { name: 'Priya Sharma', role: 'Cabin Crew' }]
    },
    // Admin (u4) has no schedule, Ground Staff (u3) can have shifts
    {
        id: 's8', userId: 'u3', type: 'training', title: 'Ramp Safety Training', start: '2024-08-05T04:00:00Z', end: '2024-08-05T08:00:00Z',
        location: 'DEL Training Center', shiftType: 'Normal'
    }
];

// Fix: Add MOCK_EXPENSES_DATA to provide expense information for the application.
export const MOCK_EXPENSES_DATA: Expense[] = [
    { id: 'e1', amount: 55, currency: 'USD', category: 'Food', date: '2024-08-06', description: 'Dinner in New York', baseAmount: 4587 },
    { id: 'e2', amount: 30, currency: 'USD', category: 'Transport', date: '2024-08-06', description: 'Taxi to hotel', baseAmount: 2502 },
    { id: 'e3', amount: 25, currency: 'EUR', category: 'Misc', date: '2024-07-22', description: 'Layover essentials', baseAmount: 2255 },
    { id: 'e4', amount: 40, currency: 'SGD', category: 'Food', date: '2024-07-19', description: 'Lunch in Singapore', baseAmount: 2460 },
];


// --- Mock Data for Detailed Wellness Screen ---
export const MOCK_SLEEP_DATA: SleepRecord[] = [
  { day: 'Mon', hours: 6.5 }, { day: 'Tue', hours: 7 }, { day: 'Wed', hours: 8 },
  { day: 'Thu', hours: 6 }, { day: 'Fri', hours: 7.5 }, { day: 'Sat', hours: 9 },
  { day: 'Sun', hours: 8.5 },
];

export const MOCK_WORKOUTS: Workout[] = [
  { title: 'Hotel Room HIIT', description: 'A 15-minute high-intensity workout you can do anywhere.', duration: 15 },
  { title: 'Post-Flight Stretch', description: 'Gentle stretching to relieve stiffness.', duration: 10 },
];

export const MOCK_MINDFULNESS_SESSIONS: MindfulnessSession[] = [
  { title: 'Box Breathing', duration: 2, type: 'Breathing' },
  { title: 'Mindful Body Scan', duration: 10, type: 'Meditation' },
];

export const MOCK_MEDICAL_REMINDERS: MedicalReminder[] = [
  { title: 'Class 1 Medical Exam', dueDate: '2024-09-15' },
  { title: 'Yellow Fever Vaccination', dueDate: '2025-01-20' },
];

// --- Mock Data for Smartwatch Integration ---
export const MOCK_SMARTWATCH_DATA: SmartwatchData = {
    heartRate: 72,
    spO2: 98,
    stressLevel: 3,
    dailySteps: { current: 4320, goal: 8000 },
    waterIntake: { current: 1200, goal: 2500 },
    bloodPressure: { systolic: 118, diastolic: 75 },
    trends: {
        heartRate: [
            { time: '00:00', value: 65 }, { time: '04:00', value: 60 }, { time: '08:00', value: 75 },
            { time: '12:00', value: 85 }, { time: '16:00', value: 80 }, { time: '20:00', value: 72 },
        ],
        bloodPressure: [
            { time: '00:00', systolic: 115, diastolic: 72 }, { time: '06:00', systolic: 112, diastolic: 70 },
            { time: '12:00', systolic: 120, diastolic: 78 }, { time: '18:00', systolic: 118, diastolic: 75 },
        ]
    }
};

export const MOCK_WELLNESS_ALERTS: WellnessAlert[] = [
    { id: 'a1', type: 'High Stress', message: 'High stress detected after your last flight.', recommendation: 'Try a 2-minute breathing exercise.' },
    { id: 'a2', type: 'Low Activity', message: 'Your steps are low today.', recommendation: 'A short walk can boost your energy before your next duty.' },
];