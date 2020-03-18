import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

class App extends Component {
  state = {
    search: "",
    results: [],
    selected: {},
    message: ""
  }

  apiurl = "https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=3742140";

  componentDidMount() {
    const selectedShows = ['Dragon', 'Hero', 'Captain America', 'Love', 'Hulk',
                           'Night', 'Space', 'Yajamana', 'Now you see me', 'Superman' ];
    let show = selectedShows[Math.floor(Math.random() * selectedShows.length)];

    this.setState(prevState => {
      return {...prevState, search: show}
    })
    
    axios(this.apiurl+"&s="+show).then(({data}) => {
      let results = data.Search;
      this.updateResult(results)
    });
  }

  search = (e) => {
    // e.preventDefault();
    if(e.key === "Enter") {
      axios(this.apiurl + "&s=" + this.state.search).then(({data})=> {
        let results = data.Search;

        (typeof results !== "undefined")? this.updateResult(results): this.updateResult(results=[]);        
      });

      e.target.value = "";
    }
  }

  updateResult = (update) => { 
    let results = update;
    let message =  (results.length > 0 && results.length < 10) ? 
                  `Here is the top ${results.length} results for a search "${this.state.search}`:
                  (results.length > 0 )? 
                  `Here is the top ${results.length} results for a search "${this.state.search}"` :
                  `There are no result for a search "${this.state.search}"`;
    
                  this.setState(prevState => {
                return {...prevState, results: results, message: message}
    })
  }

  handleInput = (e) => {
    let search = e.target.value;

    this.setState(prevState => {
      return{...prevState, search:search}
    });
    
  }

  openPopup = (id) => {
    axios(this.apiurl + "&i=" + id).then(({ data }) => {
      let selected = data;
      
      this.setState(prevState => {
       return {...prevState, selected: selected}
      });
  })
}

  closePopup = () => {
    let selected = {};

    this.setState(prevState => {
      return {...prevState, selected: selected}
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
              <Route exact path="/" render={props=>(
                <React.Fragment>
                  <header>
                    <h1>Movie Database</h1>
                  </header>
                  <main>
                    <Search handleInput={this.handleInput} search={this.search} message={this.state.message} />
                    <Results results={this.state.results} openPopup={this.openPopup}/>
                  </main>
                </React.Fragment>
              )} />
              
              <Route path={"/"+this.state.selected.Title} render={props => (
                <Popup selected={this.state.selected} closePopup={this.closePopup}/>
              )} />
          
        </div>
      </Router>
    );
  }
}

export default App;
