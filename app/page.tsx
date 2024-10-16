import Image from "next/image";
import HelloWorld from '@/components/hero/HelloWorld'
import SideLine from '@/components/hero/SideLine'

export default function Home() {
  return (

        <div className='h-full bg-hero-gradient bg-blend-overlay backdrop-filter backdrop-blur-19 w-full relative'>
          <HelloWorld />
          <SideLine />
        </div>
    
  );
}
