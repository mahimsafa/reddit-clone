import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import { useQuery } from '@apollo/client'
import { GET_SUBREDDIT_BY_LIMIT } from '../graphql/queries'
import Avatar from '../components/Avatar'
import SubredditRow from '../components/SubredditRow'


const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_SUBREDDIT_BY_LIMIT, {
    variables: {
      limit: 10
    }
  })
  const subreddits = data?.getSubredditListByLimit || []
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit 2.0 Home</title>
      </Head>

      {/* Post box */}
      <PostBox />

      <div className='flex'>
        {/* Feed  */}
        <Feed />
        {/* communities */}
        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-200 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>
          <div>
            {/* list subreddit */}
            {subreddits?.map((subreddit: Subreddit, index: number) => (
              <SubredditRow topic={subreddit.topic} key={subreddit.id} index={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
