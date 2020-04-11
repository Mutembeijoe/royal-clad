import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth, signInwithGoogle } from '../../firebase/firebase.utils'
import './sign-in.styles.scss'



class SignIn extends React.Component{
    state = {
        email:"",
        password:""
    }

    handleSubmit = async (e)=>{
        e.preventDefault()
        const {email,password} = this.state;
        await auth.signInWithEmailAndPassword(email,password)
        this.setState({email:'',password:''})
    }

    handleChange = (e) => {
        const {name, value } = e.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className="sign-in">
                <h1>I already have an Account</h1>
                <span>Sign in with email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        label="email" 
                        handleChange={this.handleChange}
                        name="email"
                        value={this.state.email}
                        required
                        type="email"
                    />

                    <FormInput 
                        label="password" 
                        handleChange={this.handleChange}
                        name="password"
                        value={this.state.password}
                        required
                        type="password"
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInwithGoogle} IsGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                   
                </form>           
            </div>
        )
    }
}


export default SignIn;