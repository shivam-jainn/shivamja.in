"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react'; // Import the arrow icon

export default function Page() {
  return (
    <div className='h-screen w-full gap-6 flex p-8'>
      <div className='flex flex-col p-8 w-[60%]'>
        <div>
          <h1 className='text-9xl'>GET IN</h1>
        </div>
        <div className='flex items-center'>
          <img src="/mernbadge.png" className='w-[200px]' alt="a badge" />
          <h1 className='text-9xl'>TOUCH</h1>
        </div>

        <div className='text-center'>
          {/* Wrapping both the text and the arrow in a single parent */}
          <a href="mailto:shivam.clgstash@gmail.com" className="text-7xl flex items-center gap-2 underline hover:no-underline group">
            Email Me
            {/* Arrow that rotates when the link is hovered */}
            <motion.div
              className='group-hover:rotate-45 transition-transform duration-300' // Added hover class for smooth transition
            >
              <ArrowUpRight className='w-12 h-12' />
            </motion.div>
          </a>
        </div>
      </div>

      <div className='flex flex-col p-8 w-[40%]'>
        <span className='text-4xl'>
          Are you looking to work on your next big project, or have a talk with your next co-founder, or make me work in your team? I would love that. Reach out to me by my email and <b>let's build sh*t together (respectfully)</b>
        </span>
      </div>
    </div>
  );
}
