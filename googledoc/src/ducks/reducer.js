const GET_EMAIL = "GET_EMAIL"


let initialState = {
    email: '',
    userId: '',
    documents: []
}


export function emailAdd(email){
    return{
        type: GET_EMAIL,
        payload: email
    }
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_EMAIL:
        return Object.assign({},state,{email: action.payload})
    }
    return state
}