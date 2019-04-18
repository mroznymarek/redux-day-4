const EMAIL_CHANGED = 'auth/EMAIL_CHANGED'
const PASS_CHANGED = 'aurh/PASS_CHANGED'

export const emailChangedActionCreator = newValue => ({
    type: EMAIL_CHANGED,
    newValue,
}) 

export const passChangedActionCreator = newValue => ({
    type: PASS_CHANGED,
    newValue,
}) 

const initialState = {
    user: null,
    email: 'email',
    password: 'password',
}

export default (state = initialState, action) => {
    switch (action.type) {        
        case EMAIL_CHANGED:
            return {
                ...state,
                email: action.newValue,
            }    
        case PASS_CHANGED:
            return {
                ...state,
                password: action.newValue,
            }
        default:
            return state
    }
}
