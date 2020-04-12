import React from 'react'

import './custom-button.styles.scss'

const CustomButton = ({children, IsGoogleSignIn, inverted, ...otherButtonProps})=> (
    <button 
        className={` ${inverted ? 'inverted' : '' } ${IsGoogleSignIn ? 'google-sign-in' : '' } custom-button`} 
        {...otherButtonProps}
    >
        {children}
    </button>
)

export default CustomButton;