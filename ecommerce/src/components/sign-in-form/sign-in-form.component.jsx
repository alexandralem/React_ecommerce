import { useState } from 'react';

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultFormFields ={
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }catch(error) {
            switch(error.code) {
                case('auth/wrong-password'):
                    alert('incorrect password for email');
                    break;
                case('auth/user-not-found'):
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
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
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;