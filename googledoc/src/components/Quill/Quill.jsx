import React from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import _ from 'lodash'
import io from 'socket.io-client'
import QuillHeader from './QuillHeader/QuillHeader';
let socket

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        text: '',
    } 
    this.handleChange = this.handleChange.bind(this)
  }


    componentDidMount() {
    socket =  io('http://localhost:3001');
    socket.on('new text', data => {
      console.log(data)
      this.setState({text: data})
    })
    }

    handleChange(value) {
      console.log(value, 'this is the value')
      socket.emit("edited text", value);
  }


    render() {
        const typing = _.debounce(value => { this.handleChange(value)}, 700)
        return (
            <div className="main-wrapper-quill">
                <QuillHeader />
                <ReactQuill theme={'snow'} onChange={typing} value={this.state.text} modules={Editor.modules}>
                  <div className="my-editing-area"/>
                </ReactQuill>
            </div>

        )
    }
}


/* 
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
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


export default Editor;