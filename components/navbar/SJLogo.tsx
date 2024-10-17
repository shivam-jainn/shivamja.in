import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link

export default function SJLogo() {
  return (
    <div className="md:hidden pl-6">
      <Link href="/">
        <Image 
          src="/sjlogo.svg" 
          alt="SJ Logo" 
          width={40} 
          height={40} 
          className="max-w-[40px] cursor-pointer" // Added cursor-pointer for visual feedback
        />
      </Link>
    </div>
  );
}
