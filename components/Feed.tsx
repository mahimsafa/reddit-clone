import { useQuery } from '@apollo/client'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './Post'


type Props = {
    topic?: string
}


const Feed = ({ topic }: Props) => {
    const { data, loading, error } = topic ?
        useQuery(GET_ALL_POSTS_BY_TOPIC, {
            variables: {
                topic: topic
            }
        }) : useQuery(GET_ALL_POSTS)

    const posts: Post[] = topic ? data?.getPostListByTopic : data?.getPostList || []

    return (
        <div className='mt-5 space-y-4'>
            {posts?.map((post, index) => (
                <Post key={post.id + index} post={post} />
            ))}

        </div>
    )
}

export default Feed