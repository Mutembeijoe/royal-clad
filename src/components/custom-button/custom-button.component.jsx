import React from 'react'

import './custom-button.styles.scss'

const CustomButton = ({children, IsGoogleSignIn, ...otherButtonProps})=> (
    <button 
        className={`${IsGoogleSignIn ? 'google-sign-in' : '' } custom-button`} 
        {...otherButtonProps}
    >
        {children}
    </button>
)

export default CustomButton;