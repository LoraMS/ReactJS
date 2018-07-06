import React, { Component } from 'react';

class Search extends Component {
    handleSubmit(e){
        e.preventDefault();
    }

    render() {
        return(
            <div className="search">
                <form class="form-inline mt-2 mt-md-0">
                    <input 
                    class="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search for ..." 
                    aria-label="Search"
                    onChange={this.props.search} />
                    <button class="btn btn-sm btn-secondary my-2 my-sm-0" type="submit" onClick={this.handleSubmit.bind(this)}>Search</button>
                </form>
            </div>
        );
    }
}

export default Search;

// .then((publication) => {
//     if (!publication) {
//         return res.render('errors/not-found');
//     }
//     return res.render('publication-views/publications', {
//         model: publications,
//     });



    // handleInputChange(e) {
    //     this.setState({
            // query: this.search.value
            // query: e.target.value
        //   }, () => {
        //     if (this.state.query && this.state.query.length > 1) {
        //       if (this.state.query.length % 2 === 0) {
        //         this.setState({
        //             items: this.props.items
        //           })
        //       }
        //     } else if (!this.state.query) {
        //     }
    //       })
    // }