import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

export default function Home() {
    let posts = [];
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        posts = data.getPosts;
    }
    return (
        <Grid columns={3} divided>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>

            <Grid.Row>
                {
                    user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
                    )
                }
                {
                    loading ? (<h1>Loading posts...</h1>) :
                        (<Transition.Group>
                            {posts &&
                                posts.map(post => (
                                    <Grid.Column key={post.id} style={{ marginBottom: 20, boxShadow: 'none' }}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>)
                }
            </Grid.Row>
        </Grid>
    );
}
