// Fix: Import 'React' to provide type definitions for React.FC
import type React from 'react';

// Basic types for user roles and screen navigation
export type UserRole = 'Pilot' | 'Cabin Crew' | 'Ground Staff' | 'Admin';
export type ScreenName = 
    | 'Home'
    | 'Profile'
    | 'Notifications'
    | 'Search'
    | 'Crew Schedule'
    | 'Wellness Data'
    | 'Employee Data'
    | 'User Manuals'
    | 'Passenger Services'
    | 'Crew Management'
    | 'Duty Calculator'
    | 'Expense Tracker'
    | 'Help & Support'
    | 'System Analytics'
    | 'App Settings'
    | 'See all';

// Navigation and UI component types
export interface NavItem {
    name: ScreenName;
    icon: React.FC<{ className?: string }>;
    roles: UserRole[];
}

export interface Category extends NavItem {}

export interface CarouselItem {
    id: number;
    imageUrl: string;
    alt: string;
}

// Data model types
export interface Notification {
    id: number;
    type: 'wellness' | 'alert' | 'system' | 'info';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

export interface Manual {
    id: number;
    title: string;
    category: string;
    version: string;
    roles: UserRole[];
}

export interface PassengerRequest {
    id: number;
    seat: string;
    type: string;
    request: string;
    status: 'Pending' | 'Completed';
}

export interface FAQ {
    q: string;
    a: string;
}

export interface Certification {
    name: string;
    expiry: string;
}

export interface Compliance {
    [agency: string]: string;
}

export interface User {
    id: string;
    name: string;
    role: UserRole;
    jobTitle: string;
    employeeId: string;
    base: string;
    contact: string;
    email: string;
    profileImageUrl: string;
    status: 'Active' | 'Standby' | 'On Leave';
    compliance: Compliance;
    certifications: Certification[];
}

export interface ComplianceStatus {
    status: 'Compliant' | 'Violation' | 'Pending';
    details: string;
}

export interface ScheduleEvent {
    id: string;
    userId: string;
    type: 'flight' | 'layover' | 'training' | 'off';
    title: string;
    start: string; // ISO 8601 date string
    end: string;   // ISO 8601 date string
    location: string;
    shiftType: 'Normal' | 'Early Start' | 'Late Finish' | 'Split Duty';
    flightNumber?: string;
    compliance?: {
        [agency: string]: ComplianceStatus;
    };
    fatiguePrediction?: {
        risk: 'Low' | 'Medium' | 'High';
        score: number;
    };
    crew?: { name: string; role: string }[];
}

export interface Expense {
    id: string;
    amount: number;
    currency: 'USD' | 'EUR' | 'SGD' | 'INR';
    category: 'Food' | 'Transport' | 'Accommodation' | 'Misc';
    date: string; // YYYY-MM-DD
    description: string;
    baseAmount: number; // Amount in INR
}

// Wellness-related types
export interface SleepRecord {
    day: string;
    hours: number;
}

export interface Workout {
    title: string;
    description: string;
    duration: number; // in minutes
}

export interface MindfulnessSession {
    title: string;
    duration: number; // in minutes
    type: 'Breathing' | 'Meditation';
}

export interface MedicalReminder {
    title: string;
    dueDate: string; // YYYY-MM-DD
}

export interface SmartwatchData {
    heartRate: number;
    spO2: number;
    stressLevel: number;
    dailySteps: { current: number; goal: number };
    waterIntake: { current: number; goal: number };
    bloodPressure: { systolic: number; diastolic: number };
    trends: {
        heartRate: { time: string; value: number }[];
        bloodPressure: { time: string; systolic: number; diastolic: number }[];
    };
}

export interface WellnessAlert {
    id: string;
    type: string;
    message: string;
    recommendation: string;
}

export interface FlightStatus {
    flightNumber: string;
    status: 'On Time' | 'Delayed' | 'Cancelled' | 'Boarding' | 'Departed';
    gate: string | null;
    departureTime: string; // ISO 8601 date string
    remarks: string | null;
}

export interface SearchResult {
    id: number;
    title: string;
    snippet: string;
    source: ScreenName;
    icon: React.FC<{ className?: string }>;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}