import BookList from './src/Components/BookList'

const name = 'Erwan ESNAULT';
const element = <getListBook />;


function getListBook(){
    return (
        <div>
            <h1>Liste des livres pour {name}: </h1>
            <BookList />
        </div>
    );
}


ReactDOM.render(
    element,
    document.getElementById('App')    
);