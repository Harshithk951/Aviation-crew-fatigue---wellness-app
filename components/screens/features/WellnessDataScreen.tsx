import React, { useState } from 'react';
import PageHeader from '../../common/PageHeader';
import { useAuth } from '../../../contexts/AuthContext';
import { MOCK_SLEEP_DATA, MOCK_WORKOUTS, MOCK_MINDFULNESS_SESSIONS, MOCK_MEDICAL_REMINDERS, MOCK_WELLNESS_ALERTS } from '../../../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowPathIcon, HeartIcon, ChartBarIcon, SunIcon, SparklesIcon, ShieldCheckIcon, UserGroupIcon, BeakerIcon, LightBulbIcon, PlayCircleIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const StatCard: React.FC<{ icon: React.FC<any>, title: string, value: string | number, unit?: string, color: string }> = ({ icon: Icon, title, value, unit, color }) => (
    <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center">
            <div className={`rounded-full p-2 ${color.replace('text', 'bg').replace('500', '100')}`}>
                <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <div className="ml-3">
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-bold text-gray-900">{value} <span className="text-sm font-normal">{unit}</span></p>
            </div>
        </div>
    </div>
);

const WellnessDataScreen: React.FC = () => {
    const { smartwatchData, syncSmartwatch } = useAuth();
    const [activeTab, setActiveTab] = useState('Sleep');

    const renderContent = () => {
        switch (activeTab) {
            case 'Sleep': return <SleepContent />;
            case 'Fitness': return <FitnessContent />;
            case 'Mental Health': return <MentalHealthContent />;
            case 'Medical': return <MedicalContent />;
            case 'Vitals': return <VitalsContent />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <PageHeader title="Wellness Sync" subtitle="Your real-time health and wellness dashboard." />
                <button onClick={syncSmartwatch} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors">
                    <ArrowPathIcon className="h-5 w-5 mr-2"/>
                    Sync with Watch
                </button>
            </div>
            
            {smartwatchData && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard icon={HeartIcon} title="Heart Rate" value={smartwatchData.heartRate} unit="bpm" color="text-red-500" />
                        <StatCard icon={BeakerIcon} title="Oxygen (SpO2)" value={`${smartwatchData.spO2}%`} color="text-blue-500" />
                        <StatCard icon={LightBulbIcon} title="Stress Level" value={smartwatchData.stressLevel} unit="/ 10" color="text-yellow-500" />
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center"><SparklesIcon className="h-5 w-5 mr-2 text-indigo-500" /> Smart Alerts</h3>
                        <div className="space-y-2">
                        {MOCK_WELLNESS_ALERTS.map(alert => (
                            <div key={alert.id} className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-md">
                                <p className="font-semibold">{alert.message}</p>
                                <p className="text-sm">{alert.recommendation}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                </>
            )}

            <div className="bg-white rounded-xl shadow">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-4 px-4" aria-label="Tabs">
                        {['Sleep', 'Fitness', 'Mental Health', 'Medical', 'Vitals'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`${tab === activeTab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="p-4">{renderContent()}</div>
            </div>
        </div>
    );
};

const SleepContent = () => (
    <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Weekly Sleep Pattern</h3>
        <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
                <BarChart data={MOCK_SLEEP_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#818cf8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-r-md">
            <p className="font-semibold">Jet Lag Advisor</p>
            <p className="text-sm">For your upcoming flight to JFK, start adjusting your sleep schedule 2 days prior. Seek morning sunlight upon arrival.</p>
        </div>
    </div>
);

const FitnessContent = () => {
    const { smartwatchData } = useAuth();
    return(
    <div className="space-y-4">
        {smartwatchData &&
        <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-100 rounded-lg text-center">
                <p className="text-sm text-gray-600">Daily Steps</p>
                <p className="text-xl font-bold">{smartwatchData.dailySteps.current.toLocaleString()}/{smartwatchData.dailySteps.goal.toLocaleString()}</p>
            </div>
             <div className="p-3 bg-gray-100 rounded-lg text-center">
                <p className="text-sm text-gray-600">Hydration</p>
                <p className="text-xl font-bold">{smartwatchData.waterIntake.current}ml / {smartwatchData.waterIntake.goal}ml</p>
            </div>
        </div>
        }
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Layover Workouts</h3>
            {MOCK_WORKOUTS.map(w => (
                <div key={w.title} className="p-3 bg-gray-50 rounded-lg mb-2 flex justify-between items-center">
                    <div>
                        <p className="font-medium">{w.title}</p>
                        <p className="text-sm text-gray-500">{w.description}</p>
                    </div>
                    <button><PlayCircleIcon className="h-8 w-8 text-indigo-500"/></button>
                </div>
            ))}
        </div>
    </div>
)};

const MentalHealthContent = () => (
    <div className="space-y-4">
        <button className="w-full p-4 bg-indigo-500 text-white rounded-lg font-semibold text-center hover:bg-indigo-600">
            Daily Stress Check-in
        </button>
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Mindfulness Sessions</h3>
            {MOCK_MINDFULNESS_SESSIONS.map(s => (
                <div key={s.title} className="p-3 bg-gray-50 rounded-lg mb-2 flex justify-between items-center">
                    <div>
                        <p className="font-medium">{s.title}</p>
                        <p className="text-sm text-gray-500">{s.duration} min {s.type}</p>
                    </div>
                    <button><PlayCircleIcon className="h-8 w-8 text-indigo-500"/></button>
                </div>
            ))}
        </div>
    </div>
);

const MedicalContent = () => (
     <div className="space-y-4">
        <div>
            <h3 className="font-semibold text-gray-800 mb-2">Health Reminders</h3>
            {MOCK_MEDICAL_REMINDERS.map(r => (
                <div key={r.title} className="p-3 bg-gray-50 rounded-lg mb-2 flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 mr-3 text-red-500"/>
                    <div>
                        <p className="font-medium">{r.title}</p>
                        <p className="text-sm text-gray-500">Due: {new Date(r.dueDate).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
         <div>
            <h3 className="font-semibold text-gray-800 mb-2">In-Flight Stretches</h3>
            <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Neck rolls and shoulder shrugs can alleviate tension. Stand and stretch your legs every hour if possible.</p>
            </div>
        </div>
    </div>
);

const VitalsContent = () => {
    const { smartwatchData } = useAuth();
    if (!smartwatchData) return <p>Sync your watch to see vitals.</p>;
    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold text-gray-800 mb-2">24h Heart Rate (bpm)</h3>
                <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <LineChart data={smartwatchData.trends.heartRate}>
                             <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div>
                 <h3 className="font-semibold text-gray-800 mb-2">24h Blood Pressure (mmHg)</h3>
                 <div style={{ width: '100%', height: 200 }}>
                    <ResponsiveContainer>
                        <LineChart data={smartwatchData.trends.bloodPressure}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#8884d8" />
                            <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};


export default WellnessDataScreen;