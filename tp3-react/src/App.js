import React from 'react';
import './App.css';
import BookList from './BookList';
import SearchBook from './SearchBook';

class App extends React.Component {

  state = {
    bookSearch: "harry potter",
    BookListComponent: BookList,
    page: 1
  }

  changeBookName = (name) => {
    this.setState({ bookSearch: name, BookListComponent: BookList });
    this.forceUpdate();
  };

  changePage(change) {
    if (parseInt(this.state.page, 10) + parseInt(change, 10) > 0) {
      this.setState({ page: parseInt(this.state.page, 10) + parseInt(change, 10) }, () => { this.forceUpdate(); });
      //this.forceUpdate();
    }
  }

  setStateSynchronous = (stateUpdate) => {
    return new Promise(resolve => {
      this.setState(stateUpdate, () => resolve());
    });
  }

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
        <h4>Recherche des livres pour : {this.state.bookSearch}</h4>
        <this.state.BookListComponent search={this.state.bookSearch} numPage={this.state.page} />

        <ul class="pagination center">
          <li class="waves-effect"><a onClick={() => this.changePage(-1)}><i class="material-icons">chevron_left</i></a></li>
          <li class="active"><a href="#!">{this.state.page}</a></li>
          <li class="waves-effect"><a onClick={() => this.changePage(1)}><i class="material-icons">chevron_right</i></a></li>
        </ul>
      </div>
    );
  }
}

export default App;
