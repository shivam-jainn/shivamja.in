import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {PostData} from '../posts'
import Image from 'next/image';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts');

async function getPostData(post: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${post}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    console.log(fileContents);
    const matterResult = matter(fileContents);
  
    return {
      post,
      date: matterResult.data.date as string, // Explicitly type the date
      title: matterResult.data.title as string, // Explicitly type the title
      author: matterResult.data.author as string, // Optional
      description: matterResult.data.description as string, // Optional
      content: matterResult.content,
      imageLink : matterResult.data.imageLink as string
    };
  }

  export default async function Post({ params }: { params: { post: string } }) {
    const postData = await getPostData(params.post);
  
    return (
      <div className="p-8 flex flex-col gap-3 items-center justify-center overflow-x-auto h-full w-full">
         <Image 
          src={postData.imageLink} 
          alt={postData.title} 
          width={800} 
          height={400} 
          className="rounded-lg" 
        />
        <h1 className="text-4xl font-bold">{postData.title}</h1>
        <p>{postData.date}</p>
        <div className="mt-4">{postData.content}</div>
      </div>
    );
  }
  