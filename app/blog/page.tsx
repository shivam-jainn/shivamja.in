import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from './posts';
import { MoveUpRight } from 'lucide-react';

export const metadata = {
  title: 'Home',
};

export default async function Blogs() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className='h-full p-8 w-full overflow-auto'>
      <div className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-screen-lg mx-auto relative z-10'>
        {allPostsData.map(({ post, date, title, author, description, imageLink }) => (
          <Link 
            href={`/blog/${post}`} 
            key={post} 
            className='relative bg-gray-800/70 p-4 h-fit min-h-[350px] rounded-lg hover:bg-zinc-600 transition overflow-hidden'
          >
            <Image 
              src={imageLink} 
              alt={title}
              height={200} 
              width={600}
              className='rounded-lg mb-4' 
            />
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl font-bold'>{title}</h1>
              <div className='flex gap-3'>
                <span>{date}</span>
                <span>{author}</span>
              </div>
              <div>{description}</div>
            </div>

            {/* Overlay and Arrow Icon */}
            <div className='absolute inset-0 bg-white opacity-0 hover:opacity-50 flex items-center justify-center transition-opacity duration-300'>
            <MoveUpRight className='text-gray-800' size={32} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
