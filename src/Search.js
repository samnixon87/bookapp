import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Books from './Books';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import ListBooks from './ListBooks';

class Search extends Component {

    static PropTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '', // initialise an empty string for query param
        books: [] // initialise an empty array for the books/search results
    }

    handleUpdate

    handleBookshelf(book, shelf) {
        BooksAPI.update(book, shelf)
            .then(() => shelf !== 'none' ? alert ('${book.title} has been aded to your shelf' : null))
            .catch(() => alert('Boh! Please try again.'));
    }

    renderResults(){
        const { books, query } = this.state;
        if (query) {
            return books.error ?
                <div>No results found buddy</div>
                : books.map((book,index) => {
                    return (
                        <ListBooks
                            key={index}
                            book={book}
                            handleBookshelf={this.handleBookshelf.bind(this)}
                            />
                    );
                });
        }
    }


    render () {
        <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" to="/">Close</button>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
                value={this.state.query}

            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.renderResults()}
          </ol>
        </div>
      </div>
    )}
    }

}

export default Search