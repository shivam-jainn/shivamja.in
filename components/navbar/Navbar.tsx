import NowLearning from "./NowLearning"
import StatusBar from "./StatusBar"
import SJLogo from "./SJLogo"
import Sidebar from "../sidebar/Sidebar"

export default function Navbar() {
  return (
    <div className="flex items-center p-2 min-h-24 justify-between border-b-[0.1px] border-gray-100/20 w-full">
      <SJLogo />
      <NowLearning current_goal="rust" />
      <StatusBar />
      <Sidebar />
 </div>
  )
}
