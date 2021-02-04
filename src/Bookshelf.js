import React, { Component } from 'react'
import Books from './Books'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
    
    static PropTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    
    render () {
        const { books, title, onChangeShelf } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    { books.map ((book) => {
                        return (
                            <Books key={book.id} book={book} onChangeShelf={onChangeShelf} />
                        )
                    }) 
                }
                </ol>
            </div>
            </div>
        )
    }
}

export default Bookshelf