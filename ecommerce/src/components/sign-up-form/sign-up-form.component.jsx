import { useState } from 'react';

import FormInput from '../form-input/form-input.component'

import Button from '../button/button.component';

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth}
from '../../utils/firebase/firebase.utils'

import './sign-up-form.styles.scss'

const defaultFormFields ={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('passwords do not match');
            return
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();
        }catch(error) {
            if(error.code = 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else{
                console.log('user creation encountered an error', error)
            }
            
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        // const name = event.target.name; 
        //const value = event.target.value;
        setFormFields({...formFields, [name]: value}) // ...formFields: This part creates a shallow copy of the current state (formFields).

        //The square brackets around name in [name]: value indicate that the property name is computed dynamically. In JavaScript, this syntax is called !!!computed property names!!!. For example, if name is 'email', the expression [name]: value evaluates to 'email': value within the object, effectively updating the 'email' property in the state with the new value. This dynamic property assignment is particularly useful when dealing with a form that has multiple input fields, allowing you to update the state based on the specific input field being changed.
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    required
                    type="text"
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}>
                </FormInput>

                <FormInput
                    label="Email"
                    required
                    type="email"
                    onChange={handleChange}
                    name='email'
                    value={email}>
                </FormInput>

                <FormInput
                    label="Password"
                    required
                    type="password"
                    onChange={handleChange}
                    name='password'
                    value={password}>
                </FormInput>

                <FormInput
                    label="Confirm Password"
                    required
                    type="password"
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}>
                </FormInput>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;