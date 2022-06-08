type Post = {
    id: number
    title: string
    body: string
    username: string
    subreddit: Subreddit
    created_at: string
    image: string
    voteList: Vote[]
    commentList: PComment[]
}

type PComment = {
    id: number
    text: string
    created_at: string
    username: string
    post_id: number
}

type Subreddit = {
    id: number
    topic: string
}

type Vote = {
    id: number
    upvote: boolean
    username: string
    post_id: number
}