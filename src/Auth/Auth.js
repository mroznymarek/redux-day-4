import React from 'react'


const Auth = (props) => (
    <div>
        {props._user ?
            props.children
            :
            <Forms />
        }
    </div>
)

export default Auth
