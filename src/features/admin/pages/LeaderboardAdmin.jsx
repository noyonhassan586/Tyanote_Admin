// src/features/admin/pages/LeaderboardAdmin.jsx
import React, { useState } from 'react';
import { Trophy, Target, Award, UserSearch, PlusCircle, Edit, Trash2, Search, ArrowLeft } from 'lucide-react';
import SettingsCard from '../../../components/ui/SettingsCard'; // Using SettingsCard for management sections

// ... (Initial Data and other code remains the same) ...
const initialMeritList = [
    { id: 1, rank: 1, name: 'Elena Petrova', score: '99.5% Accuracy', country: 'Russia' },
    { id: 2, rank: 2, name: 'Kenji Tanaka', score: '98.2% Accuracy', country: 'Japan' },
];
const initialChallenges = [
    { id: 1, title: "Today: Review 3 notes", reward: 20, type: 'Daily' },
    { id: 2, title: "This Week: Finish 2 quizzes", reward: 50, type: 'Weekly' },
];
const initialAchievements = [
    { id: 1, name: '10 Hours Studied', description: "You've focused for over 10 hours!" },
    { id: 2, name: '5 Quizzes Passed', description: "Completed 5 quizzes — Keep it up!" },
];


const LeaderboardAdmin = () => {
    const [activeTab, setActiveTab] = useState('merit');
    const [meritList, setMeritList] = useState(initialMeritList);
    const [challenges, setChallenges] = useState(initialChallenges);
    const [achievements, setAchievements] = useState(initialAchievements);
    const [seasonTitle, setSeasonTitle] = useState("Quantum Quiz Challenge — Season 1");

    const tabs = [
        { id: 'merit', label: 'Merit List', icon: Trophy },
        { id: 'challenges', label: 'Challenges', icon: Target },
        { id: 'achievements', label: 'Achievements', icon: Award },
        { id: 'users', label: 'User Lookup', icon: UserSearch },
    ];

    return (
        <div className="space-y-6">
            <div className="border-b border-border flex items-center gap-4 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-1 pb-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div>
                {activeTab === 'merit' && <MeritListManager list={meritList} setList={setMeritList} seasonTitle={seasonTitle} setSeasonTitle={setSeasonTitle} />}
                {activeTab === 'challenges' && <ChallengeManager challenges={challenges} setChallenges={setChallenges} />}
                {activeTab === 'achievements' && <AchievementManager achievements={achievements} setAchievements={setAchievements} />}
                {activeTab === 'users' && <UserLookup />}
            </div>
        </div>
    );
};

// --- Child Components using SettingsCard ---

const MeritListManager = ({ list, setList, seasonTitle, setSeasonTitle }) => (
    <SettingsCard title="Manage Merit List" icon={Trophy}>
        <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-primary/90"><PlusCircle size={16} /> Add Entry</button>
        </div>
        <div className="mb-4">
            <label className="text-sm font-medium text-muted-foreground">Season Title</label>
            <input type="text" value={seasonTitle} onChange={e => setSeasonTitle(e.target.value)} className="w-full mt-1 bg-background p-2 rounded-md border" />
        </div>
        <table className="w-full text-sm text-left">
            {/* ... table content ... */}
        </table>
    </SettingsCard>
);

const ChallengeManager = ({ challenges, setChallenges }) => (
    <SettingsCard title="Manage Daily & Weekly Challenges" icon={Target}>
        <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-primary/90"><PlusCircle size={16} /> Add Challenge</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.map(c => (
                <div key={c.id} className="bg-background/50 p-4 rounded-lg border">
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Reward: {c.reward} pts | Type: {c.type}</p>
                    <div className="flex justify-end gap-2 mt-3">
                        <button className="p-1 hover:text-primary"><Edit size={16} /></button>
                        <button onClick={() => setChallenges(challenges.filter(i => i.id !== c.id))} className="p-1 hover:text-destructive"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    </SettingsCard>
);

const AchievementManager = ({ achievements, setAchievements }) => (
    <SettingsCard title="Manage Global Achievements" icon={Award}>
        <div className="flex justify-end mb-4">
            <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md hover:bg-primary/90"><PlusCircle size={16} /> Add Achievement</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(a => (
                <div key={a.id} className="bg-background/50 p-4 rounded-lg border">
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                    <div className="flex justify-end gap-2 mt-3">
                        <button className="p-1 hover:text-primary"><Edit size={16} /></button>
                        <button onClick={() => setAchievements(achievements.filter(i => i.id !== a.id))} className="p-1 hover:text-destructive"><Trash2 size={16} /></button>
                    </div>
                </div>
            ))}
        </div>
    </SettingsCard>
);

const UserLookup = () => (
    <SettingsCard title="User Lookup" icon={UserSearch}>
        <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input type="text" placeholder="Search by username or email..." className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div className="mt-6 text-center text-muted-foreground">
            <p>Search results will appear here.</p>
        </div>
    </SettingsCard>
);

export default LeaderboardAdmin;