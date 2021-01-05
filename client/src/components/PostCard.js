import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function PostCard({ post: { body, comments, createdAt, id, likes, username } }) {

    const likePost = () => {
        console.log('like');
    };
    const commentOnPost = () => {
        console.log('comment');
    };
    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    basic
                    color='teal'
                    icon='heart'
                    label={{ basic: true, color: 'teal', pointing: 'left', content: likes.length }}
                    onClick={likePost}
                />
                <Button
                    basic
                    color='teal'
                    icon='comments'
                    label={{ basic: true, color: 'teal', pointing: 'left', content: comments.length }}
                    onClick={commentOnPost}
                />
            </Card.Content>
        </Card>
    );
}
