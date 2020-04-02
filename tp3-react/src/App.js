import React from 'react';
import './App.css';
import BookList from './BookList';
import SearchBook from './SearchBook';

class App extends React.Component {

  state = {
    bookSearch : "harry poter",
    BookListComponent : BookList,
  }
  
  changeBookName = (name) => {
    this.setState({ bookName : name, BookListComponent : BookList });
    this.setState({ state: this.state });
    
  };

  render() {
    return (
      <div className="App">

        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Google API</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <SearchBook handleSubmit={this.changeBookName.bind(this)} bookName={this.state.bookSearch} />
              </li>
            </ul>
          </div>
        </nav>
        <this.state.BookListComponent search={this.state.bookSearch}/>
      </div>
    );
  }
}

export default App;
