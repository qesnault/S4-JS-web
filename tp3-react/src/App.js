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
      this.setState({ page: parseInt(this.state.page, 10) + parseInt(change, 10) } );
    }
  }

  render() {
    return (
      <div className="App">

        <nav>
          <div class="nav-wrapper">
            <a href="#" class="brand-logo"><i class="material-icons">local_library</i>Google API</a>
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

        <footer class="page-footer">
          <div class="footer-copyright">
            Réalisé par Quentin ESNAULT
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
