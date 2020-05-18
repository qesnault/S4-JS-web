class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            index: 0,
            booklist: [],
            maxResults: 12
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.handleSearch("", 0);
    }

    handleSearch(author, index) {
        const i = (index == -1 ? 0 : this.state.index + index);
        if (i < 0) return;
        const search = (author == null ? this.state.search : author);
        const results = this.state.maxResults;
        this.setState({ search: search, booklist: [], index: i });
        const url = "https:\/\/www.googleapis.com/books/v1/volumes?maxResults="
            + results
            + "&startIndex="
            + i
            + "&q=inauthor:"
            + search;
        axios.get(url).then(list => {
            this.setState({ search: search, booklist: list.data.items, index: i });
        });
    }

    render() {
        const list = this.state.booklist;
        return (
            <div>
                <SearchBook onSubmit={this.handleSearch} />
                <BookList booklist={list} />
                <Pagination onClick={this.handleSearch} />
                <footer className="page-footer">
                    <div className="footer-copyright">
                        Réalisé par Quentin ESNAULT
                    </div>
                </footer>
            </div>
        );
    }
}

class SearchBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.value, -1);
    }

    render() {
        return (
            <div className="head">
                <nav>
                    <div className="nav-wrapper">
                        <div className="container">
                            <a href="#" className="brand-logo"><i className="material-icons">local_library</i>Google API</a>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li>
                                    <form onSubmit={this.handleSubmit.bind(this)}>
                                        <div className="input-field">
                                            <input id="search" type="search" onChange={this.handleChange} required />
                                            <label className="label-icon" htmlFor="search" onClick=""><i className="material-icons">search</i></label>
                                            <i className="material-icons">close</i>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePrev(event) {
        event.preventDefault();
        this.props.onClick(null, -12);
    }

    handleNext(event) {
        event.preventDefault();
        this.props.onClick(null, 12);
    }

    render() {
        return (
            <ul className="pagination center">
                <li className="waves-effect"><a onClick={this.handlePrev}><i className="material-icons">chevron_left</i></a></li>
                <li className="waves-effect"><a onClick={this.handleNext}><i className="material-icons">chevron_right</i></a></li>
            </ul>
        )
    }
}

class BookList extends React.Component {
    render() {
        if (this.props.booklist[0] != undefined) {
            const booklist = this.props.booklist;
            return (
                <div className="row container">
                    {booklist.map((book, index) => {
                        return <div key={index}><Book book={book} /></div>
                    })}
                </div>
            );
        }
        else {
            return <ul className="booklist"></ul>;
        }
    }
}

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            img: "",
            lien: ""
        }
    }

    fetchBook() {
        if (this.props.book.volumeInfo.imageLinks !== undefined) {
            this.setState({ img: this.props.book.volumeInfo.imageLinks.thumbnail });
        } else {
            this.setState({ img: "" });
        }
        if (this.props.book.volumeInfo.title !== undefined) {
            this.setState({ title: this.props.book.volumeInfo.title });
        } else {
            this.setState({ title: "titre introuvable" });
        }
        if (this.props.book.volumeInfo.description !== undefined) {
            this.setState({ description: this.props.book.volumeInfo.description });
        } else {
            this.setState({ description: "description introuvable" });
        }
        if (this.props.book.volumeInfo.infoLink !== undefined) {
            this.setState({ lien: this.props.book.volumeInfo.infoLink });
        } else {
            this.setState({ lien: "" });
        }
    }

    componentDidMount() {
        this.fetchBook();
    }

    render() {
        return (
            <div className="col s6 m3">
                <div className="card">
                    <div className="card-image valign-wrapper">
                        <img src={this.state.img} alt="Image du livre" />
                        <span className="card-title">
                            {this.state.title}
                        </span>
                        <a href={this.state.lien} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                    </div>
                    <div className="card-content">
                        <p>
                            {this.state.description.substring(0, 100)}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('App'));