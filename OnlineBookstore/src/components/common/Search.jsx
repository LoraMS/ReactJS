import React { Component } from 'react';

export default class Search{
    render(){
        return(
            <div className="search">
                        <a className="mobile-search" href="#"><img src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png" alt="search"/></a>
                        <form action="#" method="get" >
                            <a className="back-button" href="#" ><img src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png" alt="back"/></a>
                            <input type="search" ref="searchBox" placeholder="Search for Vegetables and Fruits" className="search-keyword" />
                            <button className="search-button" type="submit"></button>
                        </form>
            </div>
        );
    }
}