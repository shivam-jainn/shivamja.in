import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'app/blog/posts/markdown');

// Define the PostData type to specify the structure of the post data
export interface PostData {
    post: string;
    date: string; // Ensure this matches your actual date format
    imageLink : string,
    title: string; 
    author?: string; // Make this optional if not all posts have an author
    description?: string; // Make this optional if not all posts have a description
    content: string; // Include content field for the blog post
}

export async function getSortedPostsData(): Promise<PostData[]> {
  // Get file names under /posts
  const fileNames: string[] = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName: string) => {
    // Remove ".md" from file name to get id
    const post: string = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath: string = path.join(postsDirectory, fileName);
    const fileContents: string = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      post,
      ...matterResult.data,
    } as PostData; // Cast the returned object to PostData
  });

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
