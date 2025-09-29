import React, { useState, useMemo } from 'react';
import PageHeader from '../../common/PageHeader';
import { CalculatorIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';

const DutyCalculatorScreen: React.FC = () => {
    const { user, schedule, fatigueRisk } = useAuth();
    const [reportTime, setReportTime] = useState('08:00');
    const [sectors, setSectors] = useState(4);
    
    // Find next flight to pre-fill data
    const nextFlight = useMemo(() => {
        const now = new Date();
        return schedule
            .filter(e => e.type === 'flight' && new Date(e.start) > now)
            .sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime())[0];
    }, [schedule]);

    const maxFDP = useMemo(() => {
        // Simplified FDP calculation logic based on DGCA CAR Section 7
        let baseFDP = 11; // Base for 4 sectors
        const reportHour = parseInt(reportTime.split(':')[0], 10);

        if (reportHour >= 17 && reportHour < 22) baseFDP -= 1;
        else if (reportHour >= 22 || reportHour < 5) baseFDP -= 2;
        if (sectors > 4) baseFDP -= (sectors - 4) * 0.5;
        return Math.max(baseFDP, 9);
    }, [reportTime, sectors]);

    const fdpEndTime = useMemo(() => {
        const [hours, minutes] = reportTime.split(':').map(Number);
        const reportDate = new Date();
        reportDate.setHours(hours, minutes, 0, 0);
        const endDate = new Date(reportDate.getTime() + maxFDP * 60 * 60 * 1000);
        return endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, [reportTime, maxFDP]);
    
    const loadFromNextDuty = () => {
        if (nextFlight) {
            const startDate = new Date(nextFlight.start);
            // Report time is typically 1-2 hours before departure
            startDate.setHours(startDate.getHours() - 1);
            setReportTime(startDate.toTimeString().substring(0,5));
            // A simple assumption for sectors
            setSectors(nextFlight.location.includes('->') ? 2 : 1);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader title="Duty Calculator" subtitle="Estimate maximum Flight Duty Period (FDP)." />
            
            {fatigueRisk && (
                 <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm flex items-start rounded-r-md">
                   <ExclamationTriangleIcon className="h-5 w-5 mr-3 flex-shrink-0"/>
                   <p><span className="font-bold">High Fatigue Risk Alert:</span> Your recent wellness data indicates high stress or fatigue. Please exercise extra caution and ensure adequate rest.</p>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Calculation Inputs</h3>
                     {nextFlight && (
                        <button onClick={loadFromNextDuty} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                           Load from Next Duty ({nextFlight.title})
                        </button>
                     )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="reportTime" className="block text-sm font-medium text-gray-700">Report Time (24h format)</label>
                        <input type="time" id="reportTime" value={reportTime} onChange={(e) => setReportTime(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="sectors" className="block text-sm font-medium text-gray-700">Number of Sectors (Flights)</label>
                        <input type="number" id="sectors" value={sectors} onChange={(e) => setSectors(parseInt(e.target.value, 10) || 1)}
                            min="1" max="8" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-xl text-center">
                <CalculatorIcon className="h-10 w-10 mx-auto text-indigo-500 mb-2" />
                <p className="text-sm text-indigo-700">Estimated Max Flight Duty Period (FDP)</p>
                <p className="text-4xl font-bold text-indigo-900 mt-1">{maxFDP} hours</p>
                <p className="text-sm text-indigo-600 mt-2">Duty must end by approximately <span className="font-semibold">{fdpEndTime}</span></p>
                 <p className="text-xs text-indigo-500 mt-4">Disclaimer: This is an estimate based on simplified DGCA rules and should not be used for official flight planning.</p>
            </div>
        </div>
    );
};

export default DutyCalculatorScreen;