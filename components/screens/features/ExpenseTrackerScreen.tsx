import React, { useState, useMemo } from 'react';
import PageHeader from '../../common/PageHeader';
import { useAuth } from '../../../contexts/AuthContext';
import Modal from '../../common/Modal';
import { PlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import type { Expense } from '../../../types';

// Form for adding a new expense
const ExpenseForm: React.FC<{
    onSave: (expense: Omit<Expense, 'id' | 'baseAmount'>) => void;
    onClose: () => void;
}> = ({ onSave, onClose }) => {
    
    const [formData, setFormData] = useState({
        amount: '',
        currency: 'USD',
        category: 'Food' as Expense['category'],
        date: new Date().toISOString().split('T')[0],
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            amount: parseFloat(formData.amount),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
                </div>
                 <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
                    <select name="currency" id="currency" value={formData.currency} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>SGD</option>
                        <option>INR</option>
                    </select>
                </div>
            </div>
             <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Accommodation</option>
                    <option>Misc</option>
                </select>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3" />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold">Add Expense</button>
            </div>
        </form>
    );
};


const ExpenseTrackerScreen: React.FC = () => {
    const { expenses, addExpense } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const monthlyTotal = useMemo(() => {
        return expenses.reduce((sum, exp) => sum + exp.baseAmount, 0);
    }, [expenses]);
    
    // Mock allowance
    const monthlyAllowance = 50000; // in INR
    const allowanceRemaining = monthlyAllowance - monthlyTotal;
    const allowancePercentage = (monthlyTotal / monthlyAllowance) * 100;

    const handleSaveExpense = (expenseData: Omit<Expense, 'id' | 'baseAmount'>) => {
        addExpense(expenseData);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <PageHeader title="Expense Tracker" subtitle="Manage your layover expenses and allowances." />
                <button className="flex items-center text-sm px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50">
                    <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                    Export Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Expenses (This Month)</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">₹{monthlyTotal.toLocaleString('en-IN')}</p>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Allowance Remaining</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">₹{allowanceRemaining.toLocaleString('en-IN')}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${allowancePercentage}%`}}></div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                {expenses.length > 0 ? expenses.map(exp => (
                    <div key={exp.id} className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-800">{exp.description}</p>
                            <p className="text-sm text-gray-500">{new Date(exp.date).toLocaleDateString()} - {exp.category}</p>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-gray-900">₹{exp.baseAmount.toLocaleString('en-IN')}</p>
                           <p className="text-xs text-gray-500">{exp.amount} {exp.currency}</p>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 px-4 bg-white rounded-lg shadow-sm">
                        <p className="text-gray-500">No expenses logged yet.</p>
                    </div>
                )}
                </div>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-20 right-4 lg:hidden h-14 w-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700"
                aria-label="Add Expense"
            >
                <PlusIcon className="h-7 w-7" />
            </button>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Expense">
                <ExpenseForm onSave={handleSaveExpense} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default ExpenseTrackerScreen;