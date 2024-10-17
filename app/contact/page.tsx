"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Page() {
  return (
    <div className='h-screen w-full gap-6 flex items-center justify-center bg-black relative'>
      {/* Centered Email with Realistic Highlight on Hover */}
        <Mail />      
      <motion.a
        href='mailto:shivam.clgstash@gmail.com'
        className='text-4xl font-semibold text-gray-500 relative'
        whileHover={{
          backgroundColor: '#ffcc33',
          color: '#000', // Text color changes to black on hover
          transition: { duration: 0.3 },
          filter: 'drop-shadow(0 0 15px rgba(255, 204, 51, 0.7))',
        }}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.3s ease',
        }}
      >
        shivam.clgstash@gmail.com
      </motion.a>
    </div>
  );
}



