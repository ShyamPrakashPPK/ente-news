'use client'
import React, { useState } from 'react'
import AllStories from '../components/AllStories';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [selectedStory, setSelectedStory] = useState<number | null>(null);
    const router = useRouter();

    const handleStoryClick = (storyId: number) => {
        setSelectedStory(storyId);
        router.push(`/comments/${storyId}`, undefined);
    };

    return (
        <div className=''>
            <Navbar />
            <div className="flex flex-row">
                <div className="w-full md:w-1/5 bg-gray-900 h-[100vh] overflow-x-scroll">
                    <AllStories onStoryClick={handleStoryClick} />
                </div>
                <div className="md:w-4/5 bg-gray-200 h-[100vh] overflow-x-scroll">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;