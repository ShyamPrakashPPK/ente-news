'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface StoryDetailsProps {
    storyId?: number | null;
    params: { slug: string[] };
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

    const renderHTMLWithLinks = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a');
        links.forEach((link) => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
        return doc.body.innerHTML;
    };

    return (
        <div
            className="border-2 bg-gray-300  border-green-500 p-4 my-2 rounded-xl flex flex-col max-w-full "
            style={{ whiteSpace: 'pre-line' }}
        >
            <div className="flex items-center mb-2">
                <div className="text-green-500 font-bold text-lg">{comment.by}</div>
                <span className="font-normal text-sm text-gray px-3">{formattedTime}</span>
            </div>
            <p className="text-green-500"></p>
            <p dangerouslySetInnerHTML={{ __html: renderHTMLWithLinks(comment.text) }} />
            <p className="text-gray-900 "></p>
            {replies.map((reply: Comment) => (
                <CommentItem key={reply.id} comment={reply} />
            ))}
        </div>
    );
};



const StoryDetails: React.FC<any> = ({  params }): JSX.Element => {
    const [storyDetails, setStoryDetails] = useState<Story | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    let storyId: number | null = null;
    const { push } = useRouter();

 

    const handleGoBack = () => {
        push('/comments'); // Redirect to localhost/comments
    };

    useEffect(() => {
        if (params.slug.length === 1) {
            storyId = parseInt(params.slug[0], 10);
        }

        const fetchStoryDetails = async () => {
            try {
                const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`);
                const data = await response.json();

                if (data && data.kids) {
                    setStoryDetails(data);

                    const fetchedComments = [];
                    for (const commentId of data.kids) {
                        const commentResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`);
                        const commentData = await commentResponse.json();
                        fetchedComments.push(commentData);
                    }

                    setComments(fetchedComments);
                } else {
                    console.error('Invalid data structure:', data);
                }
            } catch (error) {
                console.error('Error fetching story details:', error);
            }
        };

        fetchStoryDetails();
    }, [storyId]);


    console.log(storyId,'-----------------------');
    

    if (!storyDetails) {
        return <div>Loading...</div>;
    }


    
    const formattedTime = formatRelativeTime(storyDetails.time);
    return (
        <div className='flex-1 p-5 bg-gray-200 text-gray-900 h-full fixed inset-0 z-50 mb-32 md:static md:inset-auto md:z-auto' >
            <div className="p-2" onClick={handleGoBack} >close</div>
            <div className='flex flex-col'>
                <h2 className='text-2xl text-center md:text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-br from-green-700 to-lime-500'>{storyDetails.title}</h2>
                <div className='mb-2 flex flex-col md:flex-row  md:items-baseline md:justify-center'>
                    <p className='mr-1 text-xl text-center font-bold'>{storyDetails.by} <span className='ml-2 text-gray-800 text-sm font-bold'>{formattedTime}</span></p>
                    <p className='mr-2 text-sm text-center'>Score:{storyDetails.score}</p>
                    <p className='mr-2 text-sm text-center'>Comments: {storyDetails.descendants}</p>

                </div>
                <p className='text-center text-[10px] text-green-600'>
                    <a href={storyDetails.url} target="_blank" rel="noopener noreferrer" className='font-bold'>
                        {storyDetails.url}
                    </a> </p>
            </div>

            <h3 className='text-xl font-bold mt-4'>Comments:</h3>
            <div className='max-h-full max-w-full w-[100%] overflow-x-hidden'>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default StoryDetails;
