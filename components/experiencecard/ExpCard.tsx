import React from 'react'
import { ArrowUpRight } from 'lucide-react'
export default function ExpCard({startDate,endDate,jobTitle,techStack,companyName,responsibilities}:{
    startDate : string,
    endDate: string,
    jobTitle: string,
    techStack: string[],
    companyName: string,
    responsibilities : string
}) {
  return (
    <div className='my-8 md:max-w-[50vw]'>
        <div className='flex gap-2 border-l-2 border-gray-100/30 pl-4 '>
            <span>{startDate}</span> - <span>{endDate}</span>
        </div>

        <div className='flex flex-col gap-3 my-2 rounded-3xl  pl-4 p-4 bg-gray-100/10'>
           
           <div className='flex justify-between items-center'>
            <h1 className='text-4xl'>{jobTitle} @ {companyName}</h1>
            <button className='p-2 border-2 rounded-full border-white hover:bg-black'>
                <ArrowUpRight size={32} />
            </button>
           </div>

            <div className='flex gap-3'>
                {
                    techStack.map((tech,index)=>(
                        <div key={index} className='px-3 py-1 rounded-2xl bg-gray-300/60'>
                            {tech}
                        </div>
                    ))
                }
            </div>

            {responsibilities}
        </div>
    </div>
  )
}
