import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import _ from 'lodash'
import io from 'socket.io-client'
let socket

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = {
        text: '',
        test: ''
    } 
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount(){
    socket =  io('http://localhost:3001');
    socket.on('test2', data => {
      console.log(data)
      this.setState({test: data})
    })
  }






  handleChange(value) {
    console.log(value, 'this is the value')
    socket.emit("test", value);
  }

  render() {
    const typing = _.debounce(value => { this.handleChange(value)}, 700)
    return (
      <div className='main-wrapper-quill'>
        <ReactQuill value={this.state.test}  onChange={typing}  >
        <div className="my-editing-area"/>
        
        </ReactQuill>
      </div>
      
    )
  }
}
export default Quill