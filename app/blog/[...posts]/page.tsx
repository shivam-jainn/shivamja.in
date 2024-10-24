import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts/markdown/');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    posts: [fileName.replace(/\.md$/, '')], // Change here
  }));
}

async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: matterResult.content,
    imageLink: matterResult.data.imageLink,
  };
}

export default async function Post({ params }: { params: { posts: string[] } }) {
  const postSlug = params.posts[0]; // Get the first slug from the array
  const post = await getPostData(postSlug); // Pass the slug to getPostData
  console.log(post.content)
  return (
    <div className="p-8 flex flex-col items-center h-full overflow-x-auto w-full">
      <img src={post.imageLink} alt={post.title} className="rounded-lg w-full max-w-lg mb-4" />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.date}</p>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} className='text-left'>{post.content}</ReactMarkdown>
    </div>
  );
}
