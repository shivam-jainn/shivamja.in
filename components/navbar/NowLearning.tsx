export default function NowLearning({
  current_goal
}:{
    current_goal: string
  }) {
  return (
      <div className='max-md:hidden flex items-center gap-2 p-4'>
      <span>Now Learning</span> 
      <div className=" flex gap-3 items-center bg-white/20 py-1 px-4 rounded-2xl hover:bg-orange-100/20">
        <div className="w-3 h-3 rounded-xl bg-orange-400">
        </div>
        <span >
        {current_goal}
      </span>
    </div>
   </div>
  )
}
