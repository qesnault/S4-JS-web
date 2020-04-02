import React from 'react';
import axios from 'axios';

export default class BookList extends React.Component {
    state = {
        books: [],
    };

    componentDidMount() {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse').then(res => {
            console.log(res);
            this.setState({ books : res.data });
        });
    }

    render() {
        return <ul>{this.state.books.map(book => <li>{book}</li>)}
        </ul>;
    }
}