import React, { Component } from 'react'
import router from '../Router/Router.jsx'

export default class App extends Component {
	render(){
		return (
			<div>
				{/*<header />*/}
				{router}
			</div>
		)
	}
}