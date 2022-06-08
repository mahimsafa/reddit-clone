import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
    query MyQuery {
        getPostList {
            body
            username
            title
            subreddit {
                id
                topic
            }
            created_at
            id
            image
            voteList {
                id
                upvote
                username
            }
            commentList {
                id
                text
                username
            }
        }
    }
`
export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getPostListByTopic (topic: $topic) {
            body
            username
            title
            subreddit {
                id
                topic
            }
            created_at
            id
            image
            voteList {
                id
                upvote
                username
            }
            commentList {
                id
                text
                username
            }
        }
    }
`

export const GET_POST_BY_POST_ID = gql`
    query MyQuery ($post_id: ID!) {
        getPost(id: $post_id) {
            id
            body
            commentList {
                created_at
                id
                text
                username
            }
            created_at
            image
            title
            username
            voteList {
                upvote
                username
            }
            subreddit {
               topic
            }
        }
    }
`

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query Myquery ($topic: String!) {
        getSubredditListByTopic(topic: $topic) {
            id
            topic
        }
    }
`
export const GET_SUBREDDIT_BY_LIMIT = gql`
    query Myquery ($limit: Int!) {
        getSubredditListByLimit(limit: $limit) {
            id
            topic
        }
    }
`