// src/features/admin/pages/LearnAndWinAdmin.jsx
import React, { useState } from 'react';
import { BookOpen, Users, HelpCircle, PlusCircle, Edit, Trash2, Eye, ArrowLeft } from 'lucide-react';
import SettingsCard from '../../../components/ui/SettingsCard';

// --- MOCK DATA (based on your client page) ---
const initialCompetitions = [
    { id: "biology-crash-test", name: "Biology Crash Test", date: "2025-08-08T03:00:00", eligibility: "HSC Students", fee: 50, isNew: true, isProctored: true, syllabusUrl: "#" },
    { id: "math-fast-quiz", name: "Math Fast Quiz", date: "2025-08-20T20:00:00", eligibility: "SSC Students", fee: 30, isNew: false, isProctored: false, syllabusUrl: "#" },
    { id: "physics-olympiad-prep", name: "Physics Olympiad Prep", date: "2025-09-01T18:00:00", eligibility: "University 1st Year", fee: 100, isNew: false, isProctored: false, syllabusUrl: "#" },
];

const initialFaqs = [
    { id: 1, title: "How do I prepare for a competition?", content: "Use the provided syllabus and organize your study materials in Tyanote portals for efficient learning." },
    { id: 2, title: "Can I use my own notes during the competition?", content: "No, competitions are closed-book to ensure a fair and level playing field for all participants." },
];

const mockRegistrations = {
    "biology-crash-test": [
        { id: 101, name: "Rahat Ahmed", email: "rahat@example.com", institution: "Dhaka College", payment: "Paid" },
        { id: 102, name: "Mehjabin Chowdhury", email: "mehjabin@example.com", institution: "Viqarunnisa Noon College", payment: "Paid" },
    ],
    "math-fast-quiz": [
        { id: 201, name: "Fahim Hasan", email: "fahim@example.com", institution: "Ideal School", payment: "Pending" },
    ],
};

// --- HELPER FUNCTION to determine competition status ---
const getCompetitionStatus = (date) => {
    const now = new Date();
    const compDate = new Date(date);
    // Assuming an exam is "Live" for 2 hours after start time
    const endDate = new Date(compDate.getTime() + 2 * 60 * 60 * 1000);

    if (now < compDate) return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">Upcoming</span>;
    if (now >= compDate && now <= endDate) return <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Live</span>;
    return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">Finished</span>;
};

// --- MAIN ADMIN COMPONENT ---
const LearnAndWinAdmin = () => {
    const [activeTab, setActiveTab] = useState('competitions');
    const [competitions, setCompetitions] = useState(initialCompetitions);
    const [faqs, setFaqs] = useState(initialFaqs);
    const [viewingRegistrationsOf, setViewingRegistrationsOf] = useState(null);

    const tabs = [
        { id: 'competitions', label: 'Competitions', icon: BookOpen },
        { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    ];

    if (viewingRegistrationsOf) {
        return <RegistrationsView competition={viewingRegistrationsOf} onBack={() => setViewingRegistrationsOf(null)} />;
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-border flex items-center gap-4 mb-6">
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-1 pb-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            <div>
                {activeTab === 'competitions' && <CompetitionsManager competitions={competitions} setCompetitions={setCompetitions} onViewRegistrations={setViewingRegistrationsOf} />}
                {activeTab === 'faqs' && <FaqManager faqs={faqs} setFaqs={setFaqs} />}
            </div>
        </div>
    );
};


// --- TAB COMPONENTS ---

const CompetitionsManager = ({ competitions, setCompetitions, onViewRegistrations }) => (
    <SettingsCard title="Manage Competitions" icon={BookOpen}>
        <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-primary/90"><PlusCircle size={16} /> Add Competition</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Fee</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {competitions.map(comp => (
                        <tr key={comp.id} className="border-b last:border-0">
                            <td className="px-4 py-2 font-semibold">{comp.name}</td>
                            <td className="px-4 py-2">{new Date(comp.date).toLocaleString()}</td>
                            <td className="px-4 py-2">BDT {comp.fee}</td>
                            <td className="px-4 py-2">{comp.isProctored ? 'Proctored' : 'Regular'}</td>
                            <td className="px-4 py-2">{getCompetitionStatus(comp.date)}</td>
                            <td className="px-4 py-2 flex justify-end gap-2">
                                <button onClick={() => onViewRegistrations(comp)} className="p-1 hover:text-primary" title="View Registrations"><Eye size={16} /></button>
                                <button className="p-1 hover:text-primary" title="Edit"><Edit size={16} /></button>
                                <button onClick={() => setCompetitions(competitions.filter(c => c.id !== comp.id))} className="p-1 hover:text-destructive" title="Delete"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </SettingsCard>
);

const FaqManager = ({ faqs, setFaqs }) => (
    <SettingsCard title="Manage FAQs" icon={HelpCircle}>
        <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-primary/90"><PlusCircle size={16} /> Add FAQ</button>
        </div>
        <div className="space-y-3">
            {faqs.map(faq => (
                <div key={faq.id} className="bg-background/50 p-4 rounded-lg border">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold">{faq.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{faq.content}</p>
                        </div>
                        <div className="flex gap-2 ml-4 flex-shrink-0">
                            <button className="p-1 hover:text-primary"><Edit size={16} /></button>
                            <button onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))} className="p-1 hover:text-destructive"><Trash2 size={16} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </SettingsCard>
);

const RegistrationsView = ({ competition, onBack }) => {
    const registrations = mockRegistrations[competition.id] || [];
    return (
        <SettingsCard title={`Registrations for ${competition.name}`} icon={Users}>
            <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft size={16} /> Back to Competitions</button>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Institution</th>
                            <th className="px-4 py-2">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.length > 0 ? registrations.map(reg => (
                            <tr key={reg.id} className="border-b last:border-0">
                                <td className="px-4 py-2 font-semibold">{reg.name}</td>
                                <td className="px-4 py-2">{reg.email}</td>
                                <td className="px-4 py-2">{reg.institution}</td>
                                <td className="px-4 py-2">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${reg.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                        {reg.payment}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="text-center p-8 text-muted-foreground">
                                    No registrations found for this competition.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </SettingsCard>
    );
};

export default LearnAndWinAdmin;