import React { Component } from 'react';

export default class Search{
    render(){
        return(
            <div className="search">
                <form action="#" method="get" >
                    <input type="search" ref="searchBox" placeholder="Search for Book or Event" className="search-keyword" />
                    <button className="search-button" type="submit"></button>
                </form>
            </div>
        );
    }
}