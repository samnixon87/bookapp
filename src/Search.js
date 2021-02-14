import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import Books from './Books'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {

  static propTypes = {
    booksOnShelf: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '', books: []})
  }

  handleBookSearch = (query) => {
    if(!query) {
        this.clearQuery(query)
    } else {
        this.updateQuery(query)

        BooksAPI.search(query, 20).then(books => {
            if(!books.error) {
                books.map(book => (this.props.booksOnShelf.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                this.setState({ books })
            } else {
                console.log(books.error)
            }
        })
    }
  }

  render() {
    const { onChangeShelf } = this.props
    const { query, books } = this.state;
    let bookSearchResult

    if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        bookSearchResult = books.filter(book => match.test(book.title))
    } else {
        bookSearchResult = books
    }
    bookSearchResult.sort(sortBy('title'))

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        autoFocus
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.handleBookSearch(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">

                {bookSearchResult.length !== 0 && (
                    <div className="showing-books">
                        <span> {bookSearchResult.length} results found for the query <b>{query}</b></span>
                    </div>
                )}
                <ol className="books-grid">
                    { bookSearchResult.map((books) => {
                        return (
                            <Books key={books.id} book={books} onChangeShelf={onChangeShelf} />
                        )
                    })
                    }
                </ol>
            </div>
        </div>
    )
  }
}

export default Search