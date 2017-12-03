import React, { Component } from 'react';
import { list, getPage } from './../../api/remote';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';

export default class HotelList extends Component {
    constructor(props){
        super(props);

        this.state= {
            hotels: []
        };
    }

    componentDidMount(){
        this.getData();
    }

    // async getData(){
    //     const data = await list();
    //     this.setState({ hotels: data });
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            this.getData(Number(nextProps.page));
        }
    }

    async getData(page = this.props.page || 1) {
        const data = await getPage(page);
        this.setState({ hotels: data });
    }

    render(){
        const page = Number(this.props.page || 1);
        return(
            <div className="container">
                {this.state.hotels.map(hotel => {
                    return <HotelCard key={hotel.id} props={hotel}/>;
                })}
                <div className="pagination">
                    {page > 1 && <Link to={'/view/' + (page - 1)}>&lt;</Link>}
                    <Link to={'/view/' + (page + 1)}>&gt;</Link>
                </div>
            </div>
        );
    }
}