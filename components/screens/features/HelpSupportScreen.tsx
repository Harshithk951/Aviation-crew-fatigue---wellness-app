import React, { useState } from 'react';
import PageHeader from '../../common/PageHeader';
import { MOCK_FAQS } from '../../../constants';
import { ChevronDownIcon, PhoneIcon } from '@heroicons/react/24/outline';

const FaqItem: React.FC<{ faq: { q: string; a: string } }> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 px-2"
            >
                <span className="font-semibold text-gray-800">{faq.q}</span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="px-2 pb-4 text-gray-600">
                    <p>{faq.a}</p>
                </div>
            )}
        </div>
    );
};

const HelpSupportScreen: React.FC = () => {
    return (
        <div className="space-y-6">
            <PageHeader title="Help & Support" subtitle="Find answers and get in touch with us." />

            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-2">
                    {MOCK_FAQS.map((faq, index) => <FaqItem key={index} faq={faq} />)}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Support</h3>
                 <div className="space-y-3">
                    <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 mr-3 text-gray-400"/>
                        <div>
                            <p className="font-semibold">Crew Scheduling (24/7)</p>
                            <p className="text-sm text-gray-600">+91 11 4567 8901</p>
                        </div>
                    </div>
                     <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 mr-3 text-gray-400"/>
                        <div>
                            <p className="font-semibold">IT Help Desk</p>
                            <p className="text-sm text-gray-600">+91 11 4567 8902</p>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default HelpSupportScreen;
