import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Container, Divider, Grid, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


import App from './Components/App/App.jsx'



require('./styles/main.scss')

render(
        <App></App>, document.getElementById('app')
);
