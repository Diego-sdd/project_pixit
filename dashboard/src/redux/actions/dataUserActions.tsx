export const SET_USER= 'SET_USER'
export const RESET= 'RESET'

export const setUserData = (data: any) => ({
    type: SET_USER,
    data: data,
})
export const reset = () => ({
    type: RESET,
})