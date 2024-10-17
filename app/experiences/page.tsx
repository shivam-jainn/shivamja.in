import React from 'react'
import ExpCard from '@/components/experiencecard/ExpCard'
export default function page() {
  return (
    <div className='h-full w-full p-8 overflow-auto'>
      <h1 className='text-5xl font-bold '>Experiences ✨</h1>

      <ExpCard startDate='26/04/24' endDate='31/09/2024' jobTitle='Fullstack developer' companyName='Swiftride' techStack={["react"]} responsibilities='some'/>
    
    </div>
  )
}
