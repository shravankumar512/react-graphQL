import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

export default function DeleteButton({ postId }) {

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTAION, {
        update: () => {
            setConfirmOpen(false);
        },
        variables: { postId }
    });

    return (
        <>
            <Button as="div" color="red" onClick={() => setConfirmOpen(true)} icon="trash" floated="right" />
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>
    );
}


const DELETE_POST_MUTAION = gql`
mutation deletePost($postId:ID!){
    deletePost(postId:$postId)
}
`;