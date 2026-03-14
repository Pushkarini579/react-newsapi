
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import React, { Component } from 'react'

export default class App extends Component {
  pageSize=8;
  render() {
    return (
      <div>
          <Router>
        
          <Navbar />
            
              <Routes>
                <Route exact path="/" element={<News key="general" country="us" category="general"/>}/>
                <Route exact path="/business" element={<News key="business"pagesize={this.pageSize} country="us" category="business"/>}/>
                <Route exact path="/entertainment" element={<News key="entertainment"pagesize={this.pageSize} country="us" category="entertainment"/>}/>   
                <Route exact path="/general" element={<News key="general"pagesize={this.pageSize} country="us" category="general"/>}/> 
                <Route exact path="/health" element={<News key="health"pagesize={this.pageSize} country="us" category="health"/>}/>
                <Route exact path="/science" element={<News key="science"pagesize={this.pageSize} country="us" category="science"/>}/>
                <Route exact path="/sports" element={<News key="sports"pagesize={this.pageSize} country="us" category="sports"/>}/>
                <Route exact path="/technology" element={<News key="technology"pagesize={this.pageSize} country="us" category="technology"/>}/>
              </Routes>
            
          </Router>
      </div>
    )
  }
}
