import React, { Component } from 'react';
import Counter from './Counter';
import EmptyCart from './EmptyCart';
import {findDOMNode} from 'react-dom';

export default class ShoppingCart extends Component{
    constructor(props){
        super(props);

        this.state = {
            showCart: false,
            // cart: this.props.cartItems,
        };
     }
    handleCart(e){
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }

    handleSubmit(e){
        e.preventDefault();
    }

    // handleClickOutside(event) {
    //     const cartNode = findDOMNode(this.refs.cartPreview);
    //     const buttonNode = findDOMNode(this.refs.cartButton);
    //     if(cartNode.classList.contains('active')){
    //         if (!cartNode || !cartNode.contains(event.target)){
    //             this.setState({
    //                 showCart: false
    //             })
    //             event.stopPropagation();
    //         }
    //     } 
    // }
    // componentDidMount() {
    //   document.addEventListener('click', this.handleClickOutside.bind(this), true);
    // }
    // componentWillUnmount() {
    //   document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    // }
    render(){
        // let cartItems;
        // cartItems = this.state.cart.map(product =>{
		// 	return(
		// 		<li className="cart-item" key={product.name}>
        //             <img className="product-image" src={product.image} />
        //             <div className="product-info">
        //                 <p className="product-name">{product.name}</p>
        //                 <p className="product-price">{product.price}</p>
        //             </div>
        //             <div className="product-total">
        //                 <p className="quantity">{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </p>
        //                 <p className="amount">{product.quantity * product.price}</p>
        //             </div>
        //             <a className="product-remove" href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a>
        //         </li>
		// 	)
		// });
        // let view;
        // if(cartItems.length <= 0){
		// 	view = <EmptyCart />
		// } else{
		// 	view = ''
		// }
        return(
            <div className="cart"> 
                        <div className="cart-info">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>No. of items</td>
                                        <td>:</td>
                                        <td><strong></strong></td>
                                    </tr>
                                    <tr>
                                        <td>Sub Total</td>
                                        <td>:</td>
                                        <td><strong></strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <a className="cart-icon" href="#" onClick={this.handleCart.bind(this)} ref="cartButton">
                            <img src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" alt="Cart"/>
                            {/* {this.props.totalItems ? <span className="cart-count">{this.props.totalItems}</span> : "" } */}
                        </a>
                        <div className={this.state.showCart ? "cart-preview active" : "cart-preview"} ref="cartPreview">

                            <div className="action-block">
                                <button type="button" >PROCEED TO CHECKOUT</button>
                            </div>
                        </div>
                    </div>
        );
    }
}