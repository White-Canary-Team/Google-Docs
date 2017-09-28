import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { emailAdd } from './../../ducks/reducer.js'
import Header from './../Header/Header.jsx'
import { Link } from 'react-router-dom'
import Paper from 'material-ui/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class Home extends Component {
    constructor() {
        super();
        this.state = {
            emails: '',
            userId: '',
            documents: [],
            userName: '',
            searchTerm: '',
            pic: ''
        }
    }
    componentWillMount() {
        axios.get('/user').then(response => {
            this.setState({
                emails: response.data.emails[0].value,
                pic: response.data.picture

            })
            this.props.emailAdd(this.state.emails, this.state.pic)
            4
            axios.post('/user', {
                email: this.state.emails,
            })
        })


    }


    render() {
        let style = {
            height: 100,
            width: 100,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
            padding: 20
        };
        console.log(this.props.userPic)
        return (
            <MuiThemeProvider>
                <div>
                    <Header />
                    <div className="new-doc-box">
                        <p> New Document</p>
                        <div className="new-doc">
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />

                        </div>

                    </div>
                    <div className="recent-doc">
                        <p>Recent Documents</p>

                        <div className='my-docs'>
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />
                            <Paper className="doc-box" zDepth={2} rounded={false} />

                        </div>


                    </div>

                </div>
            </MuiThemeProvider>
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