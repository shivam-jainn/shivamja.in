
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import rehypeHighlight from 'rehype-highlight';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts/markdown/');

async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Convert Markdown to HTML
  const processedContent = await remark()
    .use(html)
    .use(rehypeHighlight) // Use rehype-highlight for syntax highlighting
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  return (
    <div className='h-full p-8 w-full overflow-y-auto  flex flex-col items-center'>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.date}</p>
      <div
        className="prose prose-lg sm:prose-xl lg:prose-2xl dark:prose-invert max-w-screen-md w-full"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  );
}