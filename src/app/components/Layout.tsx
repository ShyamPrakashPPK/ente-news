'use client'
import React, { useState } from 'react'
import Navbar from './Navbar'
import AllStories from './AllStories'
import StoryDetails from './StoryDetails'

const Layout = () => {

    const [selectedStory, setSelectedStory] = useState<number | null>(null);

    const handleStoryClick = (storyId: number) => {
        setSelectedStory(storyId);
    };

  return (
      <section>
          <div>
              <Navbar />
              <div className="flex bg-gray-900">

                  <AllStories onStoryClick={handleStoryClick} />

                  {selectedStory !== null &&
                      <StoryDetails storyId={selectedStory} />
                  }

              </div>
          </div>
    </section>
  )
}

export default Layout