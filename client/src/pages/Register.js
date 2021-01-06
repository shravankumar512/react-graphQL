import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';

export default function Register(props) {
    const [errors, setErrors] = useState({});
    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const { values, onChange, onSubmit } = useForm(registerUser, initialState);

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update: (_, result) => {
            console.log(result);
            props.history.push('/');
        },
        onError: (err) => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    error={errors.email ? true : false}
                    type="email"
                    value={values.email}
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
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>Register</Button>
            </Form>
            {Object.keys(errors).length > 0 && <Message error list={Object.values(errors)} />}
        </div>
    );
}


const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        ){
            register(
                registerInput:{
                    username:$username 
                    email:$email 
                    password:$password
                    confirmPassword:$confirmPassword
                }
            ) {
            id
            username
            email    
            createdAt
            token
        }
    }

`;