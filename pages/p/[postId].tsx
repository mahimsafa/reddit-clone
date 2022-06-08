import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import TimeAgo from 'react-timeago'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import { ADD_COMMENT } from '../../graphql/mutations'
import Post from '../../components/Post'
import Avatar from '../../components/Avatar'

type FormData = {
  comment: string
}

const PostPage = () => {
  const { data: session } = useSession()

  const { query: { postId } } = useRouter()
  const { data, loading, error } = useQuery(GET_POST_BY_POST_ID,
    {
      variables: { post_id: postId },
    })
  const post: Post = data?.getPost

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPost'],
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // post comment 
    await addComment({
      variables: {
        post_id: postId,
        text: data.comment,
        username: session?.user?.name
      }
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className='max-w-5xl mx-auto mt-5'>
      <Post post={post} />
      <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16 hover:border-gray-600'>
        <p className='text-sm'>Comment as <span className='text-red-500'>{session?.user?.name}</span> </p>

        <form className='flex flex-col space-y-2 max-w-full' onSubmit={handleSubmit(onSubmit)}>

          <textarea
            {...register('comment', { required: true })}
            className='h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50'
            placeholder={session ? "What is your thought?" : 'Sign in to comment'} />
          <button className=' rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200' type='submit' disabled={!session}> Comment </button>
        </form>
        {post?.commentList.length > 0 && (
          <div className='-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10 mb-5'>
            <hr />

            {post?.commentList.map((comment: PComment) => (
              <div className='relative flex items-center space-y-5 ' key={comment.id}>
                <hr className='absolute top-10 h-16 border left-6 z-0' />
                <div className='z-50'>

                  <Avatar seed={comment.username} />
                </div>
                <div className='flex flex-col'>
                  <p className='py-2 text-xs text-gray-400'>
                    <span className='font-semibold text-gray-600'>{comment.username}</span> <TimeAgo date={comment.created_at} />
                  </p>
                  <p>{comment.text}</p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PostPage