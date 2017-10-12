import React from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import axios from 'axios'
import _ from 'lodash'
import io from 'socket.io-client'
import QuillHeader from './QuillHeader/QuillHeader';
import {connect} from 'react-redux'
import { getDocs } from './../../ducks/reducer.js'
let socket

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            test: '',
            title: '',
            editors: '',
    } 
    this.handleChange = this.handleChange.bind(this)
  }


    componentDidMount() {
    socket =  io('');

    axios.get(`/getDocumentById/${this.props.match.params.id}`).then( res => {
        console.log(res.data[0],'please say this has user id')
        this.setState({text: res.data[0].body, title:res.data[0].title, editors: res.data[0].editors})
    })

    socket.emit('room', { id: this.props.match.params.id})

    socket.on('new text', data => {
      this.setState({text: data})
    })


}

componentWillUnmount(){
        socket.emit('leave room', this.props.match.params.id);
    }


    handleChange(value) {
      console.log(value, 'this is the value')
      socket.emit("edited text", {value:value, id: this.props.match.params.id});
  }



    render() {
        const typing = _.debounce(value => {
        this.handleChange(value),
        axios.put('/save-test', {value: value, id: this.props.match.params.id} )
        
    }, 2000) 
    console.log(this.props, 'this is this props on quill')
        return (
            <div className="main-wrapper-quill">
                <QuillHeader 
                    title={this.state.title}
                    editors={this.state.editors}
                    id={this.props.match.params.id}
                />
                <ReactQuill theme={'snow'} onChange={typing} value={this.state.text} modules={Editor.modules}>
                  <div className="my-editing-area"/>
                </ReactQuill>
            </div>

        )
    }
}


Editor.modules = {
    toolbar: {
        container:
        [
             // my custom dropdown
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                    // remove formatting button
           
        ],

    }
}
function mapStateToProps(state){
    return {
        documents: state.documents,
        email: state.email
    }
}


export default connect(mapStateToProps, { getDocs })(Editor);