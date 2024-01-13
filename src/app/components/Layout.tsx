'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import AllStories from './AllStories'
import StoryDetails from './StoryDetails'
// ... (your imports)

const Layout = () => {
    const [selectedStory, setSelectedStory] = useState<number | null>(null);

    const handleStoryClick = (storyId: number) => {
        setSelectedStory(storyId);
    };

    const handleClose = () => {
        setSelectedStory(null); // Set selectedStory to null when the close button is clicked
    };

    return (
        <section>
            <div>
                <Navbar />
                <div className="flex bg-gray-900">
                    <AllStories onStoryClick={handleStoryClick} />

                    {selectedStory !== null &&
                        <StoryDetails storyId={selectedStory} onClose={handleClose} />
                    }
                </div>
            </div>
        </section>
    );
};

export default Layout;
