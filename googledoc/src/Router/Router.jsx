import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from '../components/Landing/Landing.jsx'
import Quill from '../components/Quill/Quill.jsx'
import Sheets from '../components/Sheets/Sheets.jsx'


export default (
    <Switch>
        <Route component={Landing} path='/' exact />
        <Route component={Quill} path='/Quill' exact />
        <Route component={Sheets} path='/Sheets' exact />


    </Switch>
)



