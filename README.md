Aviation Crew Fatigue & Wellness App

![alt text](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![alt text](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![alt text](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![alt text](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![alt text](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

A comprehensive, multi-portal application designed to proactively manage crew fatigue, enhance wellness, and ensure regulatory compliance in the aviation industry. This platform provides tailored experiences for different crew roles, integrating real-time health data, scheduling, and AI-powered assistance.

Table of Contents

Key Features

Architecture Overview

Tech Stack

Getting Started

Environment Variables

Deployment

Key Features
1. Multi-Portal System with Role-Based Access (RBAC)

Four Distinct Portals: Tailored dashboards and toolsets for Admin, Pilot, Cabin Crew, and Ground Staff.

Secure Authentication: A central AuthContext manages user state and permissions, ensuring data is strictly controlled by role.

2. Advanced Duty Roster & Compliance

Full CRUD Operations: Admins have full control over crew and duty rosters via interactive modals.

Predictive Fatigue Scores: Each duty event displays a calculated fatigue score, alerting crew to potential risks.

Regulatory Compliance Checks: Integrates mock DGCA, EASA, & FAA regulation checks with prominent violation alerts for admins.

3. Comprehensive Wellness Dashboard

Smartwatch Integration: A "Sync with Watch" feature pulls real-time health metrics (Heart Rate, SpO2, Stress, Steps).

Smart Alerts & Recommendations: Proactively displays personalized health recommendations based on synced data.

Integrated Fatigue Risk: Wellness data is analyzed to flag a fatigueRisk, which displays warnings on relevant screens like the Duty Calculator.

4. AI-Powered Integrations

Floating AI Assistant ("Ava"): A global, context-aware AI assistant, powered by Google Gemini, that uses the user's real-time schedule and wellness data to provide personalized support.

Global Header Search: A fully functional, AI-powered search bar capable of understanding natural language queries to find and navigate to any portal.

5. Core Utility Features

Duty & Rest Calculator: A tool for calculating Flight Time Limitations, with an option to auto-fill from the user's schedule.

Expense Tracker: A dedicated portal for logging expenses with automatic currency conversion.

Real-time Notifications: A filterable notification center for flight status changes and other critical alerts.

Architecture Overview

This project is built as a responsive Single-Page Application (SPA). The core architecture is designed around a centralized state management system using React's Context API, which provides all necessary data (auth, schedule, wellness) to the relevant components.

Responsive Design: Features an adaptive navigation system that displays a BottomNav on mobile and transforms into a SideNav on desktops for a seamless user experience.

Component-Based Structure: The UI is organized into reusable components, feature-specific screens, and role-based portals for maintainability and scalability.

Tech Stack

Frontend: React, TypeScript, Vite

Styling: Tailwind CSS

State Management: React Context API (useContext, useMemo)

AI Integration: Google Generative AI (Gemini)

Data Visualization: Recharts

Deployment: Vercel

Getting Started

To get a local copy up and running, follow these simple steps.

Prerequisites

Node.js (v18 or later)

npm

Installation & Setup

Clone the repository:

code
Sh
download
content_copy
expand_less
git clone https://github.com/Harshithk91/Aviation-crew-fatigue---wellness-app.git

Navigate to the project directory:

code
Sh
download
content_copy
expand_less
cd Aviation-crew-fatigue---wellness-app

Install NPM packages:

code
Sh
download
content_copy
expand_less
npm install

Set up your environment variables:

Create a new file named .env in the root of your project.

See the Environment Variables section below for the required content.

Start the development server:

code
Sh
download
content_copy
expand_less
npm run dev

Your application should now be running on http://localhost:5173 (or the next available port).

Environment Variables

To run this project, you need to add a .env file to the root of your project with the following content:

code
Code
download
content_copy
expand_less
# Get your API key from Google AI Studio
# https://makersuite.google.com/
VITE_GEMINI_API_KEY="YOUR_GOOGLE_API_KEY_HERE"
Deployment

This application is configured for seamless deployment on Vercel.

Connect Repository: Connect your GitHub repository to a new Vercel project. Vercel will automatically detect that it is a Vite project.

Configure Environment Variables: In your Vercel project's settings, navigate to Settings -> Environment Variables and add the VITE_GEMINI_API_KEY with your key as the value.

Deploy: Pushing to the main branch will automatically trigger a new production deployment.
