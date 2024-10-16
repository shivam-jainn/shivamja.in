import HelloWorld from './HelloWorld'
import SideLine from './SideLine'

export default function Hero() {
  return (
    <div className='h-full bg-hero-gradient bg-blend-overlay backdrop-filter backdrop-blur-19 w-full relative'>
      <HelloWorld />
      <SideLine />
    </div>
  )
}
