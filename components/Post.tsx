import { ArrowUpIcon, ArrowDownIcon, ChatAltIcon, GiftIcon, ShareIcon, BookmarkIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type Props = {
    post: Post
}

const Post = ({ post }: Props) => {
    const [vote, setVote] = useState<boolean>()
    const { data: session } = useSession()

    const upVote = async (isUpVote: boolean) => {
        !session && alert('You must be logged in to vote')
        console.log(isUpVote)
    }

    return (
        <Link href={`/p/${post.id}`}>
            <div className='rounded-md flex cursor-pointer shadow-sm border border-gray-300 bg-white hover:border hover:border-gray-600'>
                {/* votes */}
                <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>

                    <ArrowUpIcon className='vote-button hover:text-red-400' onClick={() => upVote(true)} />
                    <p className='text-xs text-black font-bold'>{post.voteList.length}</p>
                    <ArrowDownIcon className='vote-button hover:text-blue-400' onClick={() => upVote(false)} />
                </div>

                <div className='p-3 pb-1'>
                    {/* header  */}
                    <div className='flex items-center space-x-2 '>
                        <Avatar seed={post.subreddit.topic} />
                        <p className='text-xs text-gray-400'>
                            <Link href={`/r/${post.subreddit.topic}`}>
                                <span className='font-bold text-black hover:text-blue-400 hover:underline'>r/{post.subreddit.topic}</span>
                            </Link>
                            {' '}• posted by u/{post.username} <TimeAgo date={post.created_at} />
                        </p>
                    </div>
                    {/* body  */}
                    <div className='py-4'>
                        <p className='font-semibold test-xl'>{post.title}</p>
                        <p className='mt-2 text-sm font-light'>{post.body}</p>
                    </div>
                    {/* image */}
                    <img src={post.image} className='w-full' />
                    {/* foooter */}
                    <div className='flex space-x-4 text-gray-400 mt-2'>
                        <div className='post-button'>
                            <ChatAltIcon className='text-gray-400 h-6 w-6' />
                            <p className=''>{post.commentList.length} Comments</p>
                        </div>
                        <div className='post-button'>
                            <GiftIcon className='text-gray-400 h-6 w-6' />
                            <p className='hidden sm:inline'>Award</p>
                        </div>
                        <div className='post-button'>
                            <ShareIcon className='text-gray-400 h-6 w-6' />
                            <p className='hidden sm:inline'>Share</p>
                        </div>
                        <div className='post-button'>
                            <BookmarkIcon className='text-gray-400 h-6 w-6' />
                            <p className='hidden sm:inline'>Save</p>
                        </div>
                        <div className='post-button'>
                            <DotsHorizontalIcon className='text-gray-400 h-6 w-6' />
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default Post