import Link from 'next/link'; // Import Link from next/link
export default function StatusBar() {
  return (
    <>
      <div className='max-md:hidden flex gap-8 items-center md:pr-8'>
        <Link href="/blog">
          <button className='px-4 py-3 rounded-full hover:underline hover:font-bold'>
            blog
          </button>
        </Link>

        <Link href="/experiences">
          <button className='px-4 py-3 rounded-full hover:underline hover:font-bold'>
            experiences
          </button>
        </Link>

        <Link href="/about">
          <button className='px-4 py-3 rounded-full hover:underline hover:font-bold'>
            about me
          </button>
        </Link>

        <Link href="/contact">
          <button className='px-4 py-3 rounded-full hover:underline hover:font-bold'>
            contact
          </button>
        </Link>
      </div>
    </>
  );
}
