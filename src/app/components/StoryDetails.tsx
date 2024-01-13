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


const formatRelativeTime = (timestamp: number): string => {
    const now = new Date();
    const timeDiffInSeconds = Math.floor((now.getTime() - timestamp * 1000) / 1000);

    if (timeDiffInSeconds < 60) {
        return `${timeDiffInSeconds} sec ago`;
    } else if (timeDiffInSeconds < 3600) {
        const minutes = Math.floor(timeDiffInSeconds / 60);
        return `${minutes} min ago`;
    } else if (timeDiffInSeconds < 86400) {
        const hours = Math.floor(timeDiffInSeconds / 3600);
        return `${hours} hour ago`;
    } else {
        const days = Math.floor(timeDiffInSeconds / 86400);
        return `${days} day ago`;
    }
};


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

    const formattedTime = formatRelativeTime(comment.time);

    return (
        <div key={comment.id} className='border-2 border-green-500 p-4 my-2 rounded-xl flex flex-col'>

            <div className='flex items-center mb-2'>
                <div className='text-green-500 font-bold text-lg'>{comment.by}</div>
                <span className='font-normal text-sm text-gray px-3'>{formattedTime}</span>
            </div>

            <p className='text-green-500'></p>

            <p>{comment.text}</p>
            <p className='text-gray-500'></p>

            {replies.map((reply: Comment) => (
                <CommentItem key={reply.id} comment={reply} />
            ))}
        </div>
    );
};


const StoryDetails: React.FC<StoryDetailsProps & { onClose: () => void }> = ({ storyId, onClose }) => {
    const [storyDetails, setStoryDetails] = useState<Story | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchStoryDetails = async () => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`);
                const data = await response.json();
                setStoryDetails(data);

                if (data.kids) {
                    const fetchedComments = [];

                    for (const commentId of data.kids) {
                        const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`);
                        const commentData = await commentResponse.json();
                        fetchedComments.push(commentData);
                        setComments(fetchedComments);  // Update state for each comment individually
                    }
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

    const formattedTime = formatRelativeTime(storyDetails.time);

    return (
        <div className='flex-1 p-10 bg-gray-200 text-gray-900 flex flex-col fixed inset-0    justify-center items-center z-50' >
            <div className="p-2" onClick={onClose}>close</div>

            <h2 className='text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-green-700 to-lime-500'>{storyDetails.title}</h2>
            <div className='mb-4 flex  flex-col'>
                <p className='mr-2 text-xl font-bold'>{storyDetails.by} <span className='ml-2 text-gray-800 text-sm font-bold'>{formattedTime}</span></p>

                <p className='mr-2 text-sm text-center'>Score:{storyDetails.score}</p>
                <p className='mr-2 text-sm text-center'>Comments: {storyDetails.descendants}</p>

            </div>
            <p className='mb-4 text-[10px] text-green-800'>{storyDetails.url}</p>

            <h3 className='text-xl font-bold mt-4'>Comments:</h3>
            <div className='max-h-[70vh] overflow-y-auto'>
                {comments.map((comment: Comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default StoryDetails;