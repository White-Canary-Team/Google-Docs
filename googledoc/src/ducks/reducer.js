const GET_EMAIL = "GET_EMAIL"
const GET_ID = "GET_ID"


let initialState = {
    email: '',
    userId: '',
    documents: [],
    userPic:''
}


export function emailAdd(email, picture,id){
    return{
        type: GET_EMAIL,
        payload: {email: email,
                picture: picture
    }
}
}

export function getID(id){
    return{
        type: GET_ID,
        payload: id
    }
}


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_EMAIL:
            console.log('reducer', state)
            return Object.assign({},state,{email: action.payload.email, userPic: action.payload.picture})
        
        case GET_ID:
            return Object.assign({},state,{userId: action.payload})
    }
    return state
}