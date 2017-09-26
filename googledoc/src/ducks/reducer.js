const GET_EMAIL = "GET_EMAIL"


let initialState = {
    email: '',
    userId: '',
    documents: [],
    userPic:''
}


export function emailAdd(email, picture){
    return{
        type: GET_EMAIL,
        payload: {email: email,
                picture: picture
    }
}
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_EMAIL:
        return Object.assign({},state,{email: action.payload.email, userPic: action.payload.picture})
    }
    return state
}