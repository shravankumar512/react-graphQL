import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

export default function PostForm() {


    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, { error }] = useMutation(CREAT_POST_MUTATION, {
        variables: values,
        update: (proxy, result) => {
            const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
            const newData = result.data.createPost;
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [
                        newData,
                        ...data.getPosts,
                    ],
                },
            });
            values.body = '';
        },
        onError: (err) => {
            console.log(err.graphQLErrors[0].message);
        }
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post</h2>
                <Form.Field>
                    <Form.Input
                        placeholder='Hi World..!'
                        name='body'
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type='submit' color='teal'>
                        Submit
                    </Button>
                </Form.Field>
            </Form>

            {error && <Message error list={[error.graphQLErrors[0].message]} />}
        </div>
    );
}

const CREAT_POST_MUTATION = gql`
mutation createPost($body:String!){
    createPost(body:$body){
        id body createdAt username
        likes{
            id username createdAt
        }
        comments{
            id username createdAt body
        }
    }
}

`;
