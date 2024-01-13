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

                const fetchedStoriesData = [];

                for (const id of storyIds) {
                    const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                    const storyData = await storyResponse.json();

                    fetchedStoriesData.push(storyData);
                    setStories(fetchedStoriesData);  // Update state for each story individually
                }
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        };

        fetchStories();
    }, []);

    return (
        <section className='h-[150vh] p-3 md:p-10 w-full bg-gray-200  border-gray-700 overflow-y-auto'>
            <div>
                <h2 className=' text-xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br  from-green-500 to-lime-500'>All Stories</h2>
                <ul className='flex flex-col '>
                    {stories.map((story) => (
                        <li key={story.id} className='mb-2  hover:bg-green-300 p-1 rounded-md transition-colors duration-200 ease-in-out'>
                            <a href={story.url} target="_blank" rel="noopener noreferrer" className='text-gray-900 font-bold'>
                                {story.title}
                            </a>
                            <div className='flex justify-between md:justify-start items-center text-gray-500 text-sm'>
                                <div>
                                    <span className='mr-2 text-green-600 font-bold'>{story.by}</span>
                                    <span className='mr-2 text-green-600 font-light'>{story.score} points</span>
                                    <span onClick={() => onStoryClick(story.id)} className='mr-2 text-green-600 font-light'>{story.descendants} comments</span>
                                </div>
                                <div onClick={() => onStoryClick(story.id)} className='w-8 h-8 text-green-600'> <ChatBubbleBottomCenterTextIcon /></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>

    );
};

export default AllStories;
