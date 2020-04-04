import React from 'react';

export default class ShowBooks extends React.Component {

    constructor(props){
        super(props);
        this.book = this.props.book;
        this.bookTitle = "Pas de titre";
        this.bookImage = "Pas d'image";
        this.bookDescription = "Description introuvable";
        this.bookLink = "#"
    }

    fetchState(){
        this.book = this.props.book;
        if(this.props.book.volumeInfo.imageLinks !== undefined){
            this.bookImage = this.props.book.volumeInfo.imageLinks.thumbnail;
        } else {
            this.bookImage = "None";
        }
        if(this.props.book.volumeInfo.title !== undefined){
            this.bookTitle = this.props.book.volumeInfo.title;
        } else {
            this.bookTitle = "Non trouvé";
        }
        if(this.props.book.volumeInfo.description !== undefined){
            this.bookDescription = this.props.book.volumeInfo.description;
        } else {
            this.bookDescription = "Description Introuvable";
        }
        if(this.props.book.volumeInfo.previewLink !== undefined){
            this.bookLink = this.props.book.volumeInfo.previewLink;
        } else {
            this.bookDescription = "#";
        }
    }

    componentDidMount() {
        this.fetchState();
        this.forceUpdate();
    }

    componentDidUpdate() {
        this.fetchState();
    }

    render() {
        return (
            <div class="col s6 m3" key={this.book.id}>
                <div class="card">
                    <div class="card-image valign-wrapper">
                        <img src={this.bookImage} alt="Image du livre" />
                        <span class="card-title">
                            {this.bookTitle}
                        </span>
                        <a href={this.bookLink} class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                        <p>
                            {this.bookDescription.substring(0, 100)}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}