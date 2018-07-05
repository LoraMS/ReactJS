import React, { Component } from 'react';

const Search = (props) => {
    return(
        <div className="search">
            <form class="form-inline mt-2 mt-md-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button class="btn btn-sm btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            {/* <form >
                <input type="search" placeholder="Search for Book or Event" className="search-keyword" />
                <button className="search-button" type="submit"></button>
            </form> */}
        </div>
    );
}

export default Search;

// .then((publication) => {
//     if (!publication) {
//         return res.render('errors/not-found');
//     }
//     return res.render('publication-views/publications', {
//         model: publications,
//     });