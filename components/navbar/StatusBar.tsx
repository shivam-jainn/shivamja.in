import { BatteryCharging , Wifi , Menu} from 'lucide-react'
import Sidebar from '../hero/SideLine'

export default function StatusBar() {
  return (
    <>
        <div className='max-md:hidden flex gap-8 items-center md:pr-8'>
   

<button className=' px-4 py-3 rounded-full hover:underline hover:font-bold'>
blog
</button>

     <button className=' px-4 py-3 rounded-full hover:underline hover:font-bold'>
experiences
</button>


<button className=' px-4 py-3 rounded-full hover:underline hover:font-bold'>
about me
</button>

<button className=' px-4 py-3 rounded-full hover:underline hover:font-bold'>
contact
</button>
 </div>
    </>

  )
}
