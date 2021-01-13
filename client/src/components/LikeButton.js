import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default function LikeButton({ user, post: { id, likes } }) {

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        (user && likes && likes.find(like => like.username === user.username)) ? setLiked(true) : setLiked(false);
    }, [user, likes]);


    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    return (
        user ? (<Button
            basic={!liked}
            color='teal'
            icon='heart'
            label={{ basic: true, color: 'teal', pointing: 'left', content: likes && likes.length }}
            onClick={likePost}
        />) : (<Button
            basic
            color='teal'
            icon='heart'
            label={{ basic: true, color: 'teal', pointing: 'left', content: likes && likes.length }}
            as={Link}
            to="/login"
        />)
    );
}


const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
    likePost(postId:$postId){
        id
        likes{
            id username
        }
    }
}

`;