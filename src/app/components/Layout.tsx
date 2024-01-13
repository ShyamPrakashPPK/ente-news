'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import AllStories from './AllStories'
import StoryDetails from './StoryDetails'
// ... (your imports)
// ... (your imports)

const Layout = () => {
    const [selectedStory, setSelectedStory] = useState<number | null>(null);

    const handleStoryClick = (storyId: number) => {
        setSelectedStory(storyId);
    };

    const handleClose = () => {
        setSelectedStory(null);
    };

    return (
        <section className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-row">
                <div className="w-full md:w-1/5 bg-gray-900 h-[100vh] overflow-x-scroll">

                    <AllStories onStoryClick={handleStoryClick} />
                </div>
                <div className="md:w-4/5 bg-gray-200 h-[100vh] overflow-x-scroll">
                    {selectedStory !== null && (
                        <StoryDetails storyId={selectedStory} onClose={handleClose} />
                    )}
                </div>
            </div>
          
        </section>
    );
};

export default Layout;
