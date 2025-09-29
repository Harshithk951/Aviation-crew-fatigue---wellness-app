import { useState, useEffect } from 'react';
import type { FlightStatus, Notification } from '../types';
import { MOCK_NOTIFICATIONS } from '../constants';

// --- Mock Service Logic (included here to avoid creating new folders) ---

interface FlightDataStore {
    [key: string]: FlightStatus;
}

let flightData: FlightDataStore = {
    'DL287': {
        flightNumber: 'DL287',
        status: 'On Time',
        gate: 'D14',
        departureTime: '2024-07-28T18:00:00',
        remarks: null
    },
    'DL288': {
        flightNumber: 'DL288',
        status: 'On Time',
        gate: 'C28',
        departureTime: '2024-07-30T16:00:00',
        remarks: null
    },
    'UK812': {
        flightNumber: 'UK812',
        status: 'On Time',
        gate: 'A3',
        departureTime: '2024-08-02T06:30:00',
        remarks: null
    },
    '6E204': {
        flightNumber: '6E204',
        status: 'On Time',
        gate: 'T2-F4',
        departureTime: '2024-08-02T11:00:00',
        remarks: null
    },
    '6E205': {
        flightNumber: '6E205',
        status: 'On Time',
        gate: '14',
        departureTime: '2024-08-03T20:00:00',
        remarks: null
    },
    'AI101': {
        flightNumber: 'AI101',
        status: 'On Time',
        gate: 'D18',
        departureTime: '2024-08-05T14:00:00',
        remarks: null
    },
    'AI102': {
        flightNumber: 'AI102',
        status: 'On Time',
        gate: 'T4-418',
        departureTime: '2024-08-07T14:00:00',
        remarks: null
    },
    'SG819': {
        flightNumber: 'SG819',
        status: 'On Time',
        gate: 'C7',
        departureTime: '2024-08-09T05:45:00',
        remarks: null
    },
    'AF225': {
        flightNumber: 'AF225',
        status: 'On Time',
        gate: 'D21',
        departureTime: '2024-08-10T01:35:00',
        remarks: null
    },
    'AF226': {
        flightNumber: 'AF226',
        status: 'On Time',
        gate: 'M31',
        departureTime: '2024-08-11T21:45:00',
        remarks: null
    },
    // --- NEW FLIGHT STATUS ENTRIES ---
    'AI380': {
        flightNumber: 'AI380',
        status: 'On Time',
        gate: 'E4',
        departureTime: '2024-08-12T23:00:00',
        remarks: null
    },
    'AI381': {
        flightNumber: 'AI381',
        status: 'On Time',
        gate: 'T1-B6',
        departureTime: '2024-08-14T22:00:00',
        remarks: null
    },
    'EK511': {
        flightNumber: 'EK511',
        status: 'On Time',
        gate: 'F12',
        departureTime: '2024-08-14T04:15:00',
        remarks: null
    },
    'EK512': {
        flightNumber: 'EK512',
        status: 'On Time',
        gate: 'T3-A10',
        departureTime: '2024-08-15T10:00:00',
        remarks: null
    },
    '6E531': {
        flightNumber: '6E531',
        status: 'On Time',
        gate: 'B2',
        departureTime: '2024-08-16T05:30:00',
        remarks: null
    },
    '6E532': {
        flightNumber: '6E532',
        status: 'On Time',
        gate: 'C1',
        departureTime: '2024-08-16T09:00:00',
        remarks: null
    },
};

const getFlightStatus = (flightNumber: string): FlightStatus | null => {
    return flightData[flightNumber] ? { ...flightData[flightNumber] } : null;
}

const updateFlightStatus = () => {
    const flightNumbers = Object.keys(flightData);
    if (flightNumbers.length === 0) return;
    
    // Pick a random flight to update to make the simulation more dynamic
    const randomFlightNumber = flightNumbers[Math.floor(Math.random() * flightNumbers.length)];
    const flight = flightData[randomFlightNumber];

    if (!flight) return;
    if (flight.status === 'Departed' || flight.status === 'Cancelled') return;

    const previousStatus = flight.status;
    const randomChoice = Math.random();

    // Add a chance for cancellation
    if (randomChoice < 0.05 && !['Boarding', 'Departed'].includes(flight.status)) {
        flight.status = 'Cancelled';
        flight.remarks = 'This flight has been cancelled due to operational reasons.';
    } else if (randomChoice < 0.20 && flight.status === 'On Time') { // Increased chance for demo
        flight.status = 'Delayed';
        const newTime = new Date(new Date(flight.departureTime).getTime() + 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
        flight.remarks = `Delayed due to late arrival of incoming aircraft. New ETD: ${newTime}`;
    } else if (randomChoice < 0.4 && (flight.status === 'On Time' || flight.status === 'Delayed')) {
        flight.status = 'Boarding';
        flight.remarks = `Now boarding at Gate ${flight.gate}.`;
    } else if (randomChoice > 0.95) {
        const newGate = `${flight.gate?.charAt(0)}${Math.floor(Math.random() * 10) + 10}`;
        if (flight.gate !== newGate) {
             flight.remarks = `Gate change. Please proceed to Gate ${newGate}.`;
             flight.gate = newGate;
        }
    }

    // If status changed to Delayed or Cancelled, generate a notification
    if (flight.status !== previousStatus && (flight.status === 'Delayed' || flight.status === 'Cancelled')) {
        const newNotification: Notification = {
            id: Date.now(), // Use timestamp for unique ID
            type: 'alert',
            title: `Flight Alert: ${flight.flightNumber}`, // "Flight Alert" for easier filtering
            message: `Status is now '${flight.status}'. ${flight.remarks || ''}`,
            timestamp: 'Just now',
            read: false,
        };
        MOCK_NOTIFICATIONS.unshift(newNotification); // Add to the top of the list
    }
};

// Check if interval is already set to avoid multiple intervals in HMR environments
if (typeof (globalThis as any).flightStatusInterval === 'undefined') {
    (globalThis as any).flightStatusInterval = setInterval(updateFlightStatus, 10000); // Simulate updates every 10 seconds
}


// --- Custom Hook ---

export const useFlightStatus = (flightNumber: string | undefined) => {
    const [status, setStatus] = useState<FlightStatus | null>(null);

    useEffect(() => {
        if (!flightNumber) {
            setStatus(null);
            return;
        }

        let isMounted = true;

        const checkStatus = () => {
            const newStatus = getFlightStatus(flightNumber);
            if (isMounted) {
                // Simple compare to prevent re-renders if the data hasn't changed
                if (JSON.stringify(newStatus) !== JSON.stringify(status)) {
                    setStatus(newStatus);
                }
            }
        };

        checkStatus(); // Initial fetch

        const intervalId = setInterval(checkStatus, 5000); // Poll every 5 seconds

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [flightNumber, status]);

    return status;
};