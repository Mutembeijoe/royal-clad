import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'
import { signUpStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'


class SignUp extends React.Component{
    state = {
        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    handleChange = (e)=>{
        const {name,value} = e.target;
        this.setState({[name]:value})
    }

    handleSubmit = async (e) =>{
        e.preventDefault()
        const {displayName, email, password, confirmPassword} = this.state
        const {signUpStart} = this.props;

        if (password !== confirmPassword){
            alert("Passwords do not match")
            return;
        }

        // try {
        //     const {user}=  await auth.createUserWithEmailAndPassword(email, password)
        //     await createUserProfileDocument(user, {displayName})
        signUpStart(email,password,displayName)

        this.setState({
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        })

        // } catch (error) {
        //     console.error(error)
        // }
    }

    render(){
        return(
            <div className="sign-up">
                <h1 className="title">I do not have an account</h1>
                <span>Sign Up with an account and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        label="name"
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={this.state.email}
                        label="email"
                        handleChange={this.handleChange}
                        required
                    />
                     <FormInput
                        type="password"
                        name="password"
                        value={this.state.password}
                        label="password"
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        label="confirm password"
                        handleChange={this.handleChange}
                        required
                    />

                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

const mapStateToDispatch = (dispatch) => ({
    signUpStart: (email,password,displayName) => dispatch(signUpStart(email,password,displayName))
})

export default connect(null, mapStateToDispatch)(SignUp);