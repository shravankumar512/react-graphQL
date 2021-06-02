import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import { Button, Card, Grid, Image } from 'semantic-ui-react';
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function SinglePost(props) {

    const { postId } = props.match.params;
    const { user } = useContext(AuthContext);
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    });

    const [comment, setComment] = useState('')

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update: () => {
            setComment('')
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup;
    if (!data) {
        postMarkup = <h1> Loading posts...</h1 >;
    } else {

        const { id, body, username, createdAt, likes, comments } = data.getPost;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes }} />
                                <Button
                                    basic
                                    color='teal'
                                    icon='comments'
                                    label={{ basic: true, color: 'teal', pointing: 'left', content: comments.length }}
                                    as={Link}
                                    to={`post/${id}`}
                                />
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} />}
                            </Card.Content>
                        </Card>

                        {user &&
                            <Card fluid>
                                <Card.Content>
                                    <p>Post commment</p>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            name="comment"
                                            placeholder="Comment..."
                                            value={comment}
                                            onChange={(event) => setComment(event.target.value)}
                                        />
                                        <button
                                            type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}
                                        >
                                            submit
                                    </button>
                                    </div>
                                </Card.Content>
                            </Card>
                        }

                        {comments && comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id} />}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}

                    </Grid.Column>
                </Grid.Row>
            </Grid >
        );
    }
    return postMarkup;

}


const FETCH_POST_QUERY = gql`
query($postId:ID!){
    getPost(postId:$postId){
        id body username createdAt 
        likes{
            username
        }
        comments{
            id body createdAt username        
        }
    }
}
`;

const SUBMIT_COMMENT_MUTATION = gql`
mutation($postId:ID!, $body:String!){
    createComment(postId:$postId, body:$body){
        id
        comments{
           id body createdAt username        
        }
    }
}
`;