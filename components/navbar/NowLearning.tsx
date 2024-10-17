"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import { Home } from 'lucide-react'; // Import the Home icon from lucide-react

export default function NowLearning({
  current_goal,
}: {
  current_goal: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter(); // Initialize the router
  const pathname = usePathname(); // Get the current pathname

  // Define the handleClick function to redirect to the home page
  const handleClick = () => {
    router.push('/'); // Redirect to the home page
  };

  return (
    <div
      className='max-md:hidden flex items-center gap-2 p-4'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>
        {isHovered ? (pathname === '/' ? 'Welcome' : 'Go Back') : 'Now Learning'}
      </span>
      
      <div
        onClick={isHovered ? handleClick : undefined} // Call handleClick when hovered
        className="flex gap-3 items-center bg-white/20 py-1 px-4 rounded-2xl hover:bg-orange-100/20 cursor-pointer" // Add cursor pointer for better UX
      >
        {isHovered ? (
          <Home className="w-4 h-4 text-orange-400" /> // Display Home icon on hover
        ) : (
          <div className="w-3 h-3 rounded-xl bg-orange-400" /> // Display circle when not hovered
        )}
        <span>
          {isHovered ? 'home' : current_goal}
        </span>
      </div>
    </div>
  );
}
