'use client'
import React, { useEffect, useState } from 'react';

interface StoryDetailsProps {
    storyId: number;
}

interface Comment {
    by: string;
    id: number;
    kids?: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}

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

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    const [replies, setReplies] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchReplies = async () => {
            if (comment.kids) {
                const replyPromises = comment.kids.map(async (replyId: number) => {
                    const replyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${replyId}.json?print=pretty`);
                    const replyData = await replyResponse.json();
                    return replyData;
                });

                const replyData = await Promise.all(replyPromises);
                setReplies(replyData);
            }
        };

        fetchReplies();
    }, [comment.kids]);

    return (
        <div key={comment.id} className='border p-4 my-2'>
            <p>{comment.by}</p>
            <p>{comment.text}</p>

            {replies.map((reply: Comment) => (
                <CommentItem key={reply.id} comment={reply} />
            ))}
        </div>
    );
};

const StoryDetails: React.FC<StoryDetailsProps> = ({ storyId }) => {
    const [storyDetails, setStoryDetails] = useState<Story | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchStoryDetails = async () => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`);
                const data = await response.json();
                setStoryDetails(data);

                if (data.kids) {
                    const commentPromises = data.kids.map(async (commentId: number) => {
                        const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`);
                        const commentData = await commentResponse.json();
                        return commentData;
                    });

                    const commentData = await Promise.all(commentPromises);
                    setComments(commentData);
                }
            } catch (error) {
                console.error('Error fetching story details:', error);
            }
        };

        fetchStoryDetails();
    }, [storyId]);

    if (!storyDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex-1 p-10 bg-gray-900 text-gray-300'>
            <h2 className='text-2xl font-bold mb-4'>{storyDetails.title}</h2>
            <p>{storyDetails.by}</p>
            <p>{storyDetails.score}</p>
            <p>{storyDetails.url}</p>

            <h3 className='text-xl font-bold mt-4'>Comments:</h3>
            {comments.map((comment: Comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
};

export default StoryDetails;
