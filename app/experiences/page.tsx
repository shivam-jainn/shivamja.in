import React from 'react';
import ExpCard from '@/components/experiencecard/ExpCard';
import experiences from './experience.json';

export default function Page() {
  return (
    <div className='h-full w-full p-8 overflow-auto'>
      <h1 className='text-5xl font-bold'>Experiences ✨</h1>
      {experiences.map((experience, index) => (
        <ExpCard
          key={index}
          startDate={experience.startDate}
          endDate={experience.endDate}
          jobTitle={experience.jobTitle}
          companyName={experience.companyName}
          techStack={experience.techStack}
          responsibilities={experience.responsibilities.map((resp, idx) => (
            <li key={idx}>{resp}</li>
          ))}
          link={experience.link} 
        />
      ))}
    </div>
  );
}
