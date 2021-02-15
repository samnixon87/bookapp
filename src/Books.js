import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Books extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    
    render () {
        const { book, onChangeShelf } = this.props

        return (
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width:128, height: 193, backgroundImage: `url(${book.imageLinks &&
                book.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf ? book.shelf : 'none'} onChange ={(event) => onChangeShelf(event, book)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                </div>
        )
    }
}

export default Books