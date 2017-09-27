import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd } from './../../ducks/reducer.js'
import Header from './../Header/Header.jsx'
import {Link} from 'react-router-dom'


class Home extends Component {
    constructor() {
        super();
        this.state = {
            emails: '',
            userId: '',
            documents: [],
            userName: '',
            searchTerm: '',
            pic:''
        }
    }
    componentWillMount() {
        axios.get('/user').then(response => {
            this.setState({
                emails: response.data.emails[0].value,
                pic: response.data.picture

            })
            this.props.emailAdd(this.state.emails, this.state.pic)

            axios.post('/user', {
                email: this.state.emails,
            })
        })


    }
    

    render() {
        console.log(this.props.userPic)
        return (
            <div>
            <Header />            
                <Link to="/testquill">Quill Header</Link>
                <Link to="/profile">Profile</Link>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        email: state.email,
        userPic: state.userPic
    }
}
export default connect(mapStateToProps, { emailAdd })(Home)