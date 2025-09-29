import React, { useState, useCallback } from 'react';
// Fix: Update to correct Gemini API import and add Type for schema definition.
import { GoogleGenAI, Type } from '@google/genai';
import type { SearchResult, ScreenName } from '../types';
import { CalendarIcon, HeartIcon, BriefcaseIcon, FileTextIcon, UsersIcon, QuestionMarkCircleIcon, CalculatorIcon, CurrencyRupeeIcon } from '../constants';

// The context provided to the AI for searching application content.
// Expanded to include all relevant application portals for a comprehensive search.
const APP_CONTENT_CONTEXT = `
  Application Content:
  - Page: Crew Schedule
    - Keywords: flight times, roster, duty periods, DEL-JFK, layover, training
    - Content: View upcoming flights, layovers, and training sessions. Manage duty hours and see predictive fatigue risk flags.
    - Icon: CalendarIcon
  - Page: Wellness Data
    - Keywords: fatigue score, sleep patterns, stress levels, health metrics, activity, smartwatch, heart rate
    - Content: Monitor fatigue, sleep, stress, and physical activity. Sync with your smartwatch for real-time vitals.
    - Icon: HeartIcon
  - Page: Employee Data
    - Keywords: profile, contact information, employee ID, certifications, compliance
    - Content: Access personal and employment details, including role, base location, and compliance status.
    - Icon: BriefcaseIcon
  - Page: User Manuals
    - Keywords: manuals, procedures, A320neo, emergency protocols, documents
    - Content: Access training materials and technical manuals for aircraft and company procedures.
    - Icon: FileTextIcon
  - Page: Passenger Services
    - Keywords: passengers, requests, wheelchair, special meal, unaccompanied minor
    - Content: View and manage special requests from passengers for upcoming flights.
    - Icon: UsersIcon
  - Page: Crew Management
    - Keywords: crew roster, manage crew, add crew, edit crew member details
    - Content: (Admin Only) View, add, edit, and manage all crew members in the system.
    - Icon: UsersIcon
  - Page: Duty Calculator
    - Keywords: FDP, flight duty period, rest calculator, limits, regulations
    - Content: Calculate maximum flight duty period and minimum rest times based on report time and sectors.
    - Icon: CalculatorIcon
  - Page: Expense Tracker
    - Keywords: expenses, allowance, reimbursement, currency conversion, report
    - Content: Track layover expenses, manage allowances, and generate reports.
    - Icon: CurrencyRupeeIcon
  - Page: Help & Support
    - Keywords: help, support, FAQ, contact
    - Content: Find answers to frequently asked questions and get contact information for support desks.
    - Icon: QuestionMarkCircleIcon
`;

// A map to convert icon names from the AI response to React components.
// Fix: Add React to the import to resolve the 'Cannot find namespace React' error.
const ICONS: { [key: string]: React.FC<{ className?: string }> } = {
    CalendarIcon,
    HeartIcon,
    BriefcaseIcon,
    FileTextIcon,
    UsersIcon,
    QuestionMarkCircleIcon,
    CalculatorIcon,
    CurrencyRupeeIcon,
    DefaultIcon: FileTextIcon, // Fallback icon
};

// Fix: Initialize the Gemini API client as per the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Define the expected JSON schema for the AI's response.
const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'The title of the search result.',
        },
        snippet: {
          type: Type.STRING,
          description: 'A brief summary of the search result.',
        },
        source: {
          type: Type.STRING,
          description: 'The name of the page where the information is found (e.g., "Crew Schedule").',
        },
        icon: {
            type: Type.STRING,
            description: `Name of the icon to display. Must be one of: ${Object.keys(ICONS).join(', ')}.`,
        },
      },
      required: ["title", "snippet", "source", "icon"],
    },
};


export const useSearch = () => {    
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [query, setQuery] = useState('');

    // Fix: Replace simulated search with a real Gemini API call.
    const performSearch = useCallback(async (currentQuery: string) => {
        if (!currentQuery.trim()) {
            setResults([]);
            return;
        }
        
        setIsLoading(true);
        setResults([]);

        try {
            const prompt = `
                You are an intelligent search assistant for a crew management application.
                Search the following application content and return the most relevant results for the user's query.
                Return up to 5 results. If there are no relevant results, return an empty array.
                
                ---
                Application Content Context:
                ${APP_CONTENT_CONTEXT}
                ---
                
                User Query: "${currentQuery}"
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema,
                }
            });

            // Fix: Per Gemini API guidelines, when responseMimeType is 'application/json',
            // the result is a JSON string that should be trimmed before parsing.
            const jsonString = response.text.trim();
            const searchResultsFromAI = JSON.parse(jsonString);

            if (Array.isArray(searchResultsFromAI)) {
                const formattedResults: SearchResult[] = searchResultsFromAI.map((item: any, index: number) => ({
                    id: Date.now() + index,
                    title: item.title,
                    snippet: item.snippet,
                    source: item.source as ScreenName,
                    icon: ICONS[item.icon] || ICONS.DefaultIcon,
                }));
                setResults(formattedResults);
            }

        } catch (error) {
            console.error("Error performing search with Gemini:", error);
            // Provide a user-friendly error message in the results.
             setResults([{
                id: 1,
                title: 'Error processing search',
                snippet: 'There was an issue with the AI search. Please try again.',
                source: 'Home',
                icon: ICONS.DefaultIcon,
            }]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearSearch = useCallback(() => {
        setQuery('');
        setResults([]);
    }, []);

    return { query, setQuery, isLoading, results, performSearch, clearSearch };
}