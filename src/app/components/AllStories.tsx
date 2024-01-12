'use client'
import React, { useState, useEffect } from 'react';

import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';

interface Story {
    by: string;
    descendants: number;
    id: number;
    kids?: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

interface AllStoriesProps {
    onStoryClick: (storyId: number) => void;
}

const AllStories: React.FC<AllStoriesProps> = ({ onStoryClick }) => {
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
                const storyIds = await response.json();

                const storiesData = await Promise.all(
                    storyIds.map(async (id: any) => {
                        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                        return storyResponse.json();
                    })
                );

                setStories(storiesData);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    });



    return (
        <section className='h-[100vh] p-10 w-full bg-gray-900  border-gray-700 overflow-y-auto'>
            <div>
                <h2 className='text-2xl font-bold mb-4 text-white'>All Stories</h2>
                <ul className='flex flex-col '>
                    {stories.map((story) => (
                        <li key={story.id} className='mb-2 text-gray-400 hover:bg-green-700 p-1 rounded-md transition-colors duration-100 ease-in-out'>
                            <a href={story.url} target="_blank" rel="noopener noreferrer" className='text-white font-bold'>
                                {story.title}
                            </a>
                            <div className='flex items-center text-gray-500 text-sm'>
                                <span className='mr-2'>{story.score} points</span>
                                <span className='mr-2'>{story.descendants} comments</span>
                                <div onClick={() => onStoryClick(story.id)} className='w-8 h-8'> <ChatBubbleBottomCenterTextIcon /></div>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AllStories;
