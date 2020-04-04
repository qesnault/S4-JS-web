import React from 'react';
import axios from 'axios';
import ShowBooks from './ShowBooks';

export default class BookList extends React.Component {

    constructor(){
        super();
        this.books = [];
    }

    state = {
        maxResults: 12,
    };

    componentDidMount() {
        this.fetchBooks();
    }

    componentDidUpdate() {
        this.fetchBooks();
    }
    
    fetchBooks(){
        //this.setState({ name : this.props.search , books : [], page : this.props.numPage});
        var startIndex = ((this.props.numPage-1) * this.state.maxResults);
        axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=' +this.state.maxResults + '&startIndex=' + startIndex + '&q=' + this.props.search).then(response => {
            //this.setState({ books : response.data.items });
            this.books = response.data.items;
            console.log(response.data.items);
        });
    }

    render() {
        return ( <div class="row container">{
            this.books.map((book, index) => 
                <div key={index}>
                    <ShowBooks book={book}/>
                </div>
            )
        }</div>);
    }
}