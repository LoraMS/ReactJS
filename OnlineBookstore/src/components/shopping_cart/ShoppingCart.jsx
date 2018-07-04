import React, { Component } from 'react';
import EmptyCart from './EmptyCart';
import './ShoppingCart.css';

export default class ShoppingCart extends Component{
    constructor(props){
        super(props);

        this.state = {
            showCart: false,
            cart: this.props.cart,
        };
     }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }

    // handleSubmit(e){
    //     e.preventDefault();
    // }

    render(){
        let cartItems = this.state.cart;
        let view;
        if(cartItems.length <= 0){
			view =  <EmptyCart />
		} else{
                view =  this.state.cart.map(book =>
                        <li className="cart-item" key={book.id}>
                            <img className="product-image" src={book.image} />
                            <div className="product-info">
                                <p className="product-name">{book.title}</p>
                                <p className="product-price">{book.price}</p>
                            </div>
                            <div className="product-total">
                                <p className="amount">{book.price}</p>
                            </div>
                            <button type="button" className="product-remove close" aria-label="Close" onClick={this.props.removeBook.bind(this, book.id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </li>
                    )
                }
        return(
            <div className="cart"> 
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Items</td>
                                        <td>:</td>
                                        <td><strong>{this.props.totalItems}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>:</td>
                                        <td><strong>{this.props.total}$</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img src="https://drive.google.com/thumbnail?id=1IfEA5dFnBrWdngo7Hy6jslTHIftYg7IR" alt="Cart"/>
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">
                        {view}
                            <div className="action-block">
                                <button type="button" className={this.state.cart.length > 0 ? "btn btn-lg btn-secondary" : "btn btn-lg btn-secondary disabled"}>CHECKOUT</button>
                            </div>
                        </div>
                    </div>
        );
    }
}