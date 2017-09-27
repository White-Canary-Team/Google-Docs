import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from '../components/Landing/Landing.jsx'
import Quill from '../components/Quill/Quill.jsx'
import Sheets from '../components/Sheets/Sheets.jsx'
import Home from '../components/Home/Home.jsx'
import Profile from '../components/Profile/Profile.jsx'



export default (
    <Switch>
        <Route component={Landing} path='/' exact />
        <Route component={Home} path='/Home' exact />
        <Route component={Quill} path='/Quill' exact />
        <Route component={Sheets} path='/Sheets' exact />
        <Route component={Profile} path='/Profile' exact />



    </Switch>
)



