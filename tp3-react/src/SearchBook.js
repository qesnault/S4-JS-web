import React from 'react';

export default class SearchBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: this.props.bookName };
        this.handleChange = this.handleChange.bind(this);
        this.mySubmitHandler = this.mySubmitHandler.bind(this);
    }

    handleChange(event) {    
      this.setState({name: event.target.value});  
    }

    mySubmitHandler = (event) => {
      event.preventDefault();
      this.props.handleSubmit(this.state.name);
    }

    render() {
      return (
        <form onSubmit={this.mySubmitHandler.bind(this)}>
            <div class="input-field">
                <input id="search" type="search" onChange={this.handleChange} value={this.state.name} required/>
                <label class="label-icon" for="search" onClick=""><i class="material-icons">search</i></label>
                <i class="material-icons">close</i>
            </div>
        </form> 
      );
    }
  }