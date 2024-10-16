import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

export default function SideLine() {
  return (
    <div className='max-md:hidden absolute left-1 top-4 h-[90%] flex flex-col items-center justify-between w-12  px-3 py-2'>
      <div className='flex flex-col gap-4'>
        <div className='h-32 bg-white w-1 rounded-3xl'></div>
      </div>


      <div className="flex flex-col gap-3">
        <FontAwesomeIcon icon={faLinkedin} size="xl" />
        <FontAwesomeIcon icon={faGithub} size="xl" />
      </div>
    </div>
  )
}
