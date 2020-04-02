import React from 'react';
import axios from 'axios';
import ShowBooks from './ShowBooks';

const key = "AIzaSyBNLjqRwNk_Q42eR22yFmsrirpbi94dBBA";

export default class BookList extends React.Component {

    state = {
        books: [],
        name: this.props.search,
        maxResults: 12,
        page: this.props.numPage
    };

    componentDidMount() {
        this.fetchBooks();
    }

    componentWillReceiveProps(){
        this.fetchBooks();
    }

    fetchBooks(){
        this.setState({ name : this.props.search , books : [], page : this.props.numPage});
        var startIndex = ((this.state.page-1) * this.state.maxResults);
        axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=' +this.state.maxResults + '&startIndex=' + startIndex + '&q=' + this.state.name  + ':keyes&key=' + key).then(response => {
            this.setState({ books : response.data.items });
            console.log(response.data.items);
        });
    }

    render() {
        return ( <div class="row container">{
            this.state.books.map(book => 
                <div>
                    <ShowBooks book={book}/>
                </div>
            )
        }</div>);
    }
}