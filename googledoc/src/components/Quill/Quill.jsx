import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

class Quill extends Component {
  constructor(props) {
    super(props)
    this.state = {
        text: '' 
    } 
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    return (
      <ReactQuill value={this.state.text} onChange={this.handleChange}  >
      <div className="my-editing-area"/>
      </ReactQuill>

      
    )
  }
}
export default Quill