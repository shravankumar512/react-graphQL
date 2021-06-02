import React, { useContext } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from './MyPopup';

export default function PostCard({ post: { body, comments, createdAt, id, likes, username } }) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes }} />
                <MyPopup content="Comment Post">
                    <Button
                        basic
                        color='teal'
                        icon='comments'
                        label={{ basic: true, color: 'teal', pointing: 'left', content: comments.length }}
                        as={Link}
                        to={`post/${id}`}
                    />
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    );
}
