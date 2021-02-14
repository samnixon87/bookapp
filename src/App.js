import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Search from './Search.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  onChangeShelf = (event, book) => {
    const shelf = event.target.value
    
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter (b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        { /* Main Page */}
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onChangeShelf={this.onChangeShelf}/>
        )}/>
        { /* Search Page */ }
        <Route path="/search" render={( {history} ) => (
        <Search booksOnShelf={this.state.books} onChangeShelf={this.onChangeShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
