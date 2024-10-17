import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ExpCard({
  startDate,
  endDate,
  jobTitle,
  techStack,
  companyName,
  responsibilities,
  link
}: {
  startDate: string,
  endDate: string,
  jobTitle: string,
  techStack: string[],
  companyName: string,
  responsibilities: React.ReactNode, // Changed to accept React nodes
  link?: string // Optional link
}) {
  return (
    <div className='my-8 p-8'>
      <div className='flex gap-2 border-l-2 border-gray-100/30 pl-4 '>
        <span>{startDate}</span> - <span>{endDate}</span>
      </div>

      <div className='flex flex-col gap-3 my-2 rounded-3xl pl-4 p-8 bg-gray-100/10'>
        <div className='flex gap-4 justify-between items-center'>
          <h1 className='text-4xl'>{jobTitle} @ {companyName}</h1>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <button className='p-2 border-2 rounded-full border-white hover:bg-black'>
              <ArrowUpRight 
        className='md:w-8 md:h-8 w-6 h-6' 
      />
              </button>
            </a>
          )}
        </div>

        <div className='flex gap-3'>
          {techStack.map((tech, index) => (
            <div key={index} className='px-3 py-1 rounded-2xl bg-gray-300/60'>
              {tech}
            </div>
          ))}
        </div>

        <ul className='list-disc pl-5'>
          {responsibilities}
        </ul>
      </div>
    </div>
  );
}
