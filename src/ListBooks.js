import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookshelf from './Bookshelf'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, onChangeShelf } = this.props
        return (
            <div className="list-books">
                <div className="app-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf title="Currently Reading" onChangeShelf={onChangeShelf} books={books.filter(books => books.shelf === 'currentlyReading')}/>
                        <Bookshelf title="Want To Read" onChangeShelf={onChangeShelf} books={books.filter(books => books.shelf === 'wantToRead')}/>
                        <Bookshelf title="Read" onChangeShelf={onChangeShelf} books={books.filter(books => books.shelf === 'read')}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                        className="add-contact"
                    >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks