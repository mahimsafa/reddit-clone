import { gql } from '@apollo/client'

export const ADD_POST = gql`
    mutation AddPost(
        $body: String!
        $image: String!
        $subreddit_id: ID!
        $title: String!
        $username: String!
    ) {
        insertPost(
            body: $body
            subreddit_id: $subreddit_id
            title: $title
            username: $username
            image: $image
        ) {
            id
            title
            username
            body
            created_at
            image
            subreddit_id
        }
    }
`

export const ADD_SUBREDDIT = gql`
    mutation AddSubreddit($topic: String!) {
        insertSubreddit(topic: $topic) {
            created_at
            id
            topic
        }
    }
`

export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $text: String!, $username: String!) {
        insertComment(post_id: $post_id, text: $text, username: $username) {
            created_at
            id
            post_id
            text
            username
            
        }
    }

`