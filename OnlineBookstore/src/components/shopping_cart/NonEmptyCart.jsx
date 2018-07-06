import React, {Component} from 'react';

class NonEmptyCart extends Component{
    render(){
        return(
            <div>
                {this.props.cart.map(book =>
                    <div className="cart-item" key={book.id}>
                        <img className="book-image" src={book.image} alt="book"/>
                        <div className="book-info">
                            <p className="book-title">{book.title}</p>
                        </div>
                        <div className="book-total">
                            <p className="amount">{book.price}</p>
                        </div>
                        <button type="button" className="book-remove close" aria-label="Close" onClick={this.props.removeBook.bind(this, book.id)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )}
            </div>
        )
    }
    
};

export default NonEmptyCart;