import React from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'


class SignIn extends React.Component{
    state = {
        email:"",
        password:""
    }

    handleSubmit = (e)=>{
        e.preventDefault()
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
                    />

                    <FormInput 
                        label="password" 
                        handleChange={this.handleChange}
                        name="password"
                        value={this.state.password}
                    />
                    <CustomButton type="submit">Sign In</CustomButton>
                </form>           
            </div>
        )
    }
}


export default SignIn;