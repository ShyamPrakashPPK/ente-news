// 'use client'
// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import AllStories from './AllStories'
// import { useRouter } from 'next/navigation'
// import dynamic from 'next/dynamic';

// interface CommentsProps {
//     storyId: any;
//     onClose: () => void;
// }

// const DynamicComments = dynamic<CommentsProps>(() => import('../comments/[id]/page'), { ssr: false });

// interface LayoutProps {
//     children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//     const [selectedStory, setSelectedStory] = useState<number | null>(null);
//     const router = useRouter();

//     const handleStoryClick = (storyId: number) => {
//         setSelectedStory(storyId);
//         router.push(`/comments/${storyId}`, undefined);
//     };

//     const handleClose = () => {
//         setSelectedStory(null);
//     };

//     return (
//         <section className="flex flex-col h-screen">
//             <Navbar />
//             <div className="flex flex-row">
//                 <div className="w-full md:w-1/5 bg-gray-900 h-[100vh] overflow-x-scroll">
//                     <AllStories onStoryClick={handleStoryClick} />
//                 </div>
//                 <div className="md:w-4/5 bg-gray-200 h-[100vh] overflow-x-scroll">
//                     {selectedStory !== null ? (
//                         <DynamicComments storyId={selectedStory} onClose={handleClose} />
//                     ) : (
//                         children
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Layout;
