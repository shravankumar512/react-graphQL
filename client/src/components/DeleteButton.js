import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopup from './MyPopup';

export default function DeleteButton({ postId, commentId, callback }) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTAION : DELETE_POST_MUTAION;

    const [deletePostOrComment] = useMutation(mutation, {
        update: (proxy) => {
            setConfirmOpen(false);

            if (!commentId) {
                const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })

                const newData = data.getPosts.filter((o) => o.id !== postId)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [
                            ...newData,
                        ],
                    },
                })
            }

            if (callback) callback();
        },
        variables: { postId, commentId }
    });

    return (
        <>
            <MyPopup content={commentId ? 'Delete Comment' : 'Delete Post'} >
                <Button as="div" color="red" onClick={() => setConfirmOpen(true)} icon="trash" floated="right" />
            </MyPopup>

            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrComment} />
        </>
    );
}


const DELETE_POST_MUTAION = gql`
mutation deletePost($postId:ID!){
    deletePost(postId:$postId)
}
`;

const DELETE_COMMENT_MUTAION = gql`
mutation deleteComment($postId:ID!, $commentId:ID!){
    deleteComment(postId:$postId, commentId:$commentId){
        id
        comments{
            id username createdAt body
        }
    }
}
`;