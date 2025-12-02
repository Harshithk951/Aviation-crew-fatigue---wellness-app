<div align="center">
  <br />
  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Airplane.png" alt="Airplane" width="120" height="120" />
  
  <h1 align="center">Aviation Crew Fatigue & Wellness Platform</h1>

  <p align="center">
    A next-generation SaaS platform designed to proactively manage crew fatigue, enhance wellness, and ensure regulatory compliance in the aviation industry.
  </p>

  <div align="center">
    <!-- Status Badges -->
    <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </div>
  
  <br />

  <!-- Deployment Badge -->
  <a href="https://vercel.com">
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Deployed on Vercel"/>
  </a>
</div>

<br />

---

### **🛠️ Tech Stack**

This project utilizes a modern, high-performance technology stack to ensure scalability, security, and a seamless user experience.

| Category | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | ![React](https://img.shields.io/badge/React_18-20232a?style=flat-square&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **Styling & UI** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![HeroIcons](https://img.shields.io/badge/HeroIcons-4B5563?style=flat-square) |
| **State Management** | **React Context API** (Centralized Auth & Data Store) |
| **Artificial Intelligence** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-8E75B2?style=flat-square&logo=google&logoColor=white) (Generative AI Integration) |
| **Data Visualization** | ![Recharts](https://img.shields.io/badge/Recharts-22b5bf?style=flat-square) |
| **Routing** | **React Router DOM** (Client-side Routing) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |

---

### **✨ Key Features**

| Feature | Description |
| :--- | :--- |
| 🛡️ **RBAC System** | Four distinct, secure portals for **Admin**, **Pilot**, **Cabin Crew**, and **Ground Staff**, strictly controlled by a robust Auth system. |
| 📊 **Wellness Dashboard** | Real-time synchronization with wearables to track Heart Rate, SpO2, and Stress, providing **predictive fatigue analysis**. |
| 🤖 **AI Assistant ("Ava")** | A context-aware floating AI assistant that uses real-time schedule and health data to answer crew queries instantly. |
| 📅 **Smart Rostering** | Interactive schedule management with CRUD capabilities and **automatic regulatory compliance checks** (DGCA/EASA/FAA). |
| ✈️ **Flight Operations** | Real-time flight status simulation, delay alerts, and gate change notifications. |
| 💰 **Expense Tracker** | Built-in expense logging with automatic multi-currency conversion and allowance tracking. |

---

### **📂 Project Architecture**

The application follows a modular, component-based architecture optimized for maintenance and scalability.

<details>
  <summary><strong>View File Structure</strong></summary>

  ```bash
  src/
  ├── components/
  │   ├── ai/            # AI Assistant logic and UI
  │   ├── common/        # Reusable UI components (Modals, Cards)
  │   ├── screens/       # Page views (Dashboard, Roster, Profile)
  │   ├── Header.tsx     # Global Navigation Header
  │   └── SideNav.tsx    # Responsive Sidebar
  ├── contexts/
  │   └── AuthContext.tsx # Centralized State (User, Roster, Wellness)
  ├── hooks/
  │   └── useAIAssistant.ts # Custom hook for Google Gemini API integration
  ├── types/             # TypeScript interfaces and type definitions
  ├── constants/         # Mock data and configuration constants
  ├── App.tsx            # Main Application Entry & Router
  └── main.tsx           # DOM Renderer
