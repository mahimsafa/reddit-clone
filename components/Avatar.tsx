import { useSession } from "next-auth/react"
import Image from "next/image"

type Props ={
    seed?: string
    large?: boolean
}

const Avatar = ({seed, large}: Props) => {
    const {data: session} = useSession()
  return (
    <div className={`relative w-10 h-10 rounded-full border-gray-300 bg-white overflow-hidden ${large && 'w-20 h-20'}`}>
        <Image
        src={`https://avatars.dicebear.com/api/big-smile/${seed || session?.user?.name}.svg`}
        layout="fill"
        alt="avatar"
        />
    </div>
  )
}

export default Avatar