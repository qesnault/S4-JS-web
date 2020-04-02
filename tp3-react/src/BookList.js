import React from 'react';
import axios from 'axios';

const key = "AIzaSyBNLjqRwNk_Q42eR22yFmsrirpbi94dBBA";

export default class BookList extends React.Component {

    state = {
        books: [],
        name: this.props.search,
        maxResults: 12,
        page: 1
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks(){
        var startIndex = ((this.state.page-1) * this.state.maxResults);
        axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=' +this.state.maxResults + '&startIndex=' + startIndex + '&q=' + this.state.name  + ':keyes&key=' + key).then(response => {
            this.setState({ books : response.data.items });
        });
    }

    render() {
        return <div class="row container">{
            this.state.books.map(book => 
                <div class="col s6 m3" key={book.id}>
                    <div class="card">
                        <div class="card-image valign-wrapper">
                            {<img src={book.volumeInfo.imageLinks.thumbnail} alt="Image du livre"/>}
                            <span class="card-title">
                                {book.volumeInfo.title}
                            </span>
                        </div>
                        <div class="card-content">
                            <p>
                                {book.volumeInfo.description.substring(0,100)}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }</div>;
    }
}