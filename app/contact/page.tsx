"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react'; 

export default function Page() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('shivam.clgstash@gmail.com'); 
      setIsCopied(true); 

      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <div className='h-screen w-full gap-6 flex max-md:flex-col p-8'>
      <div className='flex flex-col p-8 w-[60%] max-md:w-full'>
        <div>
          <h1 className='text-9xl max-md:text-6xl'>GET IN</h1>
        </div>
        <div className='flex items-center max-md:flex-col'>
          <img src="/mernbadge.png" className='w-[200px] max-md:w-[150px]' alt="a badge" />
          <h1 className='text-9xl max-md:text-6xl'>TOUCH</h1>
        </div>

        <div className='text-center mt-6'>
          <button 
            onClick={handleCopyEmail} 
            className="text-7xl max-md:text-4xl flex items-center gap-2 underline hover:no-underline group"
          >
            Email Me
            <motion.div
              className='group-hover:rotate-45 transition-transform duration-300'
            >
              <ArrowUpRight className='w-12 h-12 max-md:w-8 max-md:h-8' />
            </motion.div>
          </button>
        </div>
      </div>

      <div className='flex flex-col p-8 w-[40%] max-md:w-full'>
        <span className='text-4xl max-md:text-2xl'>
          Are you looking to work on your next big project, or have a talk with your next co-founder, or make me work in your team? I would love that. Reach out to me by my email and <b>let's build sh*t together (respectfully)</b>
        </span>
      </div>

      {isCopied && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out animate-slide-in">
          Email has been copied!
        </div>
      )}
    </div>
  );
}
