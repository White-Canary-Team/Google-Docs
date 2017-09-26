import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd } from './../../ducks/reducer.js'
import Header from './../Header/Header.jsx'


class Home extends Component {
    constructor() {
        super();
        this.state = {
            emails: '',
            userId: '',
            documents: [],
            userName: '',
            searchTerm: ''
        }
    }
    componentWillMount() {
        axios.get('/user').then(response => {
            this.setState({
                emails: response.data.emails[0].value,

            })
            this.props.emailAdd(this.state.emails)

            axios.post('/user', {
                email: this.state.emails,
            })
        })


    }
    

    render() {
        console.log(this.state.searchTerm)
        return (
            <div>
            <Header />            
                <p>Home</p>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        email: state.email
    }
}
export default connect(mapStateToProps, { emailAdd })(Home)