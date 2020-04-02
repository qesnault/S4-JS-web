import React from 'react';

export default class ShowBooks extends React.Component {

    fetchState(){
        if(this.props.book.volumeInfo.imageLinks !== undefined){
            this.setState({ bookImage : this.props.book.volumeInfo.imageLinks.thumbnail });
        }
        if(this.props.book.volumeInfo.title !== undefined){
            this.setState({ bookTitle : this.props.book.volumeInfo.title });
        }
        if(this.props.book.volumeInfo.description !== undefined){
            this.setState({ bookDescription : this.props.book.volumeInfo.description });
        }
        this.setState({
            book : this.props.book,
        });
    }

    state = {
        book : "",
        bookTitle : "",
        bookImage : "",
        bookDescription : ""
    };

    componentDidMount() {
        this.fetchState();
    }

    render() {
        return (
            <div class="col s6 m3" key={this.state.book.id}>
                <div class="card">
                    <div class="card-image valign-wrapper">
                        <img src={this.state.bookImage} alt="Image du livre" />
                        <span class="card-title">
                            {this.state.bookTitle}
                        </span>
                    </div>
                    <div class="card-content">
                        <p>
                            {this.state.bookDescription.substring(0, 100)}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}