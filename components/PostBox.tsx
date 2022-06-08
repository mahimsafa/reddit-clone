import { useSession } from 'next-auth/react'
import Avatar from './Avatar'
import { LinkIcon, PhotographIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import client from '../lib/apollo-client'


type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    subreddit: string
}

type Props = {
    subreddit?: string
}


const PostBox = ({ subreddit }: Props) => {
    const { data: session } = useSession()
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POSTS, 'getPostList']
    })
    const [addSubreddit] = useMutation(ADD_SUBREDDIT)
    const [imageboxOpen, setImageboxOpen] = useState<boolean>(false)

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormData>()

    const onSubmit = handleSubmit(async (formData) => {
        try {
            const { data: { getSubredditListByTopic } } = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: subreddit || formData.subreddit
                }
            })

            const subredditExists = getSubredditListByTopic.length > 0

            if (!subredditExists) {
                console.log('Subreddit not found, creating...')
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    }
                })
                console.log('Subreddit created: ' + newSubreddit.topic)
                console.log('Posting...')
                const image = formData.postImage || ''
                console.log('Image: ', image)
                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        title: formData.postTitle,
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        username: session?.user?.name
                    }
                })
                console.log('Post created: ' + newPost.id)
            } else {
                console.log('Subreddit found, posting...')
                const image = formData.postImage || ''
                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        title: formData.postTitle,
                        body: formData.postBody,
                        image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        username: session?.user?.name
                    }
                })
                console.log('Post created: ' + newPost.id)
            }

            setValue('postTitle', '')
            setValue('postBody', '')
            setValue('postImage', '')
            setValue('subreddit', '')


        } catch (error) {
            console.error(error)
        }
    })



    return (<form onSubmit={onSubmit} className='sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2'>
        <div className='flex items-center space-x-3'>
            <Avatar />
            <input type="text"
                {...register('postTitle', { required: true })}
                disabled={!session}
                className='bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1'
                placeholder={session ? subreddit ? `Create a post in r/${subreddit}` : 'Create post by entering title.' : 'Sign In to post'}
            />
            <PhotographIcon onClick={() => setImageboxOpen(!imageboxOpen)} className={`cursor-pointer h-6 w-6 text-gray-300 ${imageboxOpen && 'text-blue-300'}`} />
            <LinkIcon className='h-6 w-6 text-gray-300 cursor-pointer' />
        </div>
        {!!watch('postTitle') && (
            <div className='flex flex-col py-2'>
                <div className='flex items-center px-2'>
                    <p className='min-w-[90px]'>Body:</p>
                    <input
                        type="text"
                        className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                        {...register('postBody')}
                        placeholder='Text (Optional)' />
                </div>
                {!subreddit && (
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Subreddit:</p>
                        <input
                            type="text"
                            className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                            {...register('subreddit', { required: true })}
                            placeholder='i. e. reactjs' />
                    </div>
                )}


                {imageboxOpen && (
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Image:</p>
                        <input
                            type="text"
                            className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                            {...register('postImage')}
                            placeholder='Optional.'
                        />
                    </div>
                )}

                {/* errors */}

                {Object.keys(errors).length > 0 && (
                    <div className='space-y-2 p-2 text-red-500'>
                        {errors.postTitle && (
                            <p className='text-red-500'>Post title required</p>
                        )}
                        {errors.subreddit && (
                            <p className='text-red-500'>Subreddit required</p>
                        )}

                    </div>
                )}

                {watch('postTitle') && (
                    <button type='submit' className='w-full py-2 rounded-full bg-blue-400 text-white'>Create Post</button>
                )}

            </div>
        )}
    </form>
    )
}

export default PostBox