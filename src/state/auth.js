import { auth, googleProvider, database } from '../firebaseConf'

const EMAIL_CHANGED = 'auth/EMAIL_CHANGED'
const PASS_CHANGED = 'auth/PASS_CHANGED'
const SET_USER = 'auth/SET_USER'
const SET_USER_LOGINS_LOGS = 'auth/SET_USER_LOGINS_LOGS'

export const startListeningToAuthChangeAsyncActionCreator = (
    () => (dispatch, getState) => {
        auth.onAuthStateChanged(
            (user) => {
                console.log(user)

                if (user) {
                    dispatch(setUserActionCreator(user))
                    dispatch(passChangedActionCreator(''))
                    dispatch(emailChangedActionCreator(''))
                    dispatch(logUserLoginAsyncActionCreator())
                    dispatch(startListeningUsersLoginsLogAsyncActionCreator())
                } else {
                    dispatch(stopListeningUsersLoginsLogAsyncActionCreator())
                    dispatch(setUsersLogInLogsActionCreator(null))
                    dispatch(setUserActionCreator(user))
                }
            }
        )
    }
)

export const stopListeningUsersLoginsLogAsyncActionCreator = (
    () => (dispatch, getState) => {
        const state = getState()
        const userId = state.auth.user.uid
        database.ref(`users/${userId}/login`).off()
    }
)

export const startListeningUsersLoginsLogAsyncActionCreator = (
    () => (dispatch, getState) => {
        const state = getState()
        const userId = state.auth.user.uid

        database.ref(`users/${userId}/login`)
            .on(
                'value',
                (snapshot) => {
                    dispatch(
                        setUsersLogInLogsActionCreator(
                            snapshot.val()
                        )
                    )
                }
            )
    }
)

export const logUserLoginAsyncActionCreator = () => (dispatch, getState) => {
    const state = getState()
    const userId = state.auth.user.uid

    database.ref(`users/${userId}/login`)
        .push({
            timestamp: Date.now(),
        })
}

export const logInAsyncActionCreator = () => (dispatch, getState) => {
    const state = getState()
    const email = state.auth.email
    const password = state.auth.password

    auth.signInWithEmailAndPassword(email, password)
        .then(() => console.log('ZALOGOWANO'))
        .catch((error) => console.log('WYSTĄPIŁ BŁĄD', error))
}

export const logInGoogleAsyncActionCreator = () => (dispatch, getState) => {
    auth.signInWithPopup(googleProvider)
        .then(() => console.log('ZALOGOWANO'))
        .catch((error) => console.log('WYSTĄPIŁ BŁĄD', error))
}

export const logOut = () => (dispatch, getState) => {
    auth.signOut()
}

const setUsersLogInLogsActionCreator = data => ({
    type: SET_USER_LOGINS_LOGS,
    data,
})

const setUserActionCreator = user => ({
    type: SET_USER,
    user,
})

export const emailChangedActionCreator = newValue => ({
    type: EMAIL_CHANGED,
    newValue,
})

export const passChangedActionCreator = newValue => ({
    type: PASS_CHANGED,
    newValue,
})

const initialState = {
    userLoginsLog: null,
    user: null,
    email: '',
    password: '',
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
        case SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case SET_USER_LOGINS_LOGS:
            return {
                ...state,
                userLoginsLog: action.data,

            }
        default:
            return state
    }
}
