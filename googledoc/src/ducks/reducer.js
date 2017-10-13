import axios from 'axios'


const GET_EMAIL = "GET_EMAIL"
const GET_ID = "GET_ID"
const GET_DOCS ="GET_DOCS"
const GET_DOCS_PENDING = "GET_DOCS_PENDING"
const GET_DOCS_FULFILLED = "GET_DOCS_FULFILLED"
const GET_SEARCH = "GET_SEARCH"


let initialState = {
    email: '',
    userId: '',
    documents: [],
    userPic:'',
    loading:false,
    searchTerm: ''
}
export function getDocs(){
    return{
        type: GET_DOCS,
        payload: axios.get('/documents').then(response=>response.data)
    }
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
export function getSearch(search){
    return {
        type: GET_SEARCH,
        payload: search
    }
}



export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_EMAIL:
            console.log('reducer', state)
            return Object.assign({},state,{email: action.payload.email, userPic: action.payload.picture})
        
        case GET_ID:
            return Object.assign({},state,{userId: action.payload})

        case GET_DOCS_PENDING:
            return Object.assign({}, state, {loading: true})

        case GET_DOCS_FULFILLED:
            return Object.assign({},state,{loading: false, documents: action.payload})
        
        case GET_SEARCH:
            return Object.assign({},state,{searchTerm: action.payload})
    }
        
    return state
}