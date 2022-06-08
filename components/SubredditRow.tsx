import { ChevronUpIcon } from "@heroicons/react/solid"
import Link from "next/link"
import Avatar from "./Avatar"

type Props = {
    topic: string
    index: number
}

const SubredditRow = ({topic, index}: Props) => {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
        <p>{index+1}</p>
        <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
        <Avatar seed={topic} />
        <Link href={`r/${topic}`} >
        <p className="flex-1 font-semibold truncate cursor-pointer hover:text-blue-600 hover:underline">r/{topic}</p>
        </Link>
        <Link href={`r/${topic}`} >
            <div className="cursor-pointer bg-blue-500 px-3 text-white py-1 rounded-full">View</div>
        </Link>
    </div>
  )
}

export default SubredditRow