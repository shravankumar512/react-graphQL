import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';

export default function Login(props) {

    const [errors, setErrors] = useState({});

    const initialState = {
        username: '',
        password: ''
    };

    const { values, onChange, onSubmit } = useForm(loginUserCallback, initialState);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update: (_, result) => {
            console.log(result);
            props.history.push('/');
        },
        onError: (err) => {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    error={errors.username ? true : false}
                    type="text"
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    error={errors.password ? true : false}
                    type="password"
                    value={values.password}
                    onChange={onChange}
                />
                <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />}
        </div>
    );
}


const LOGIN_USER = gql`
    mutation login(
        $username:String!
        $password:String!
    ){
        login(
            username: $username
            password: $password
        ){        
            id
            username
            email
            createdAt
            token
        }
    }
`;