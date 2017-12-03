import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from './../common/Input';
import { create } from './../../api/remote';

class CreatePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            location: '',
            description: '',
            numberOfRooms: '',
            image: '',
            parkingSlots: '',
            error: false,
            submitting: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        this.setState({submitting: true});  
        //take info by request and parse if needed
        const hotel = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            numberOfRooms: Number(this.state.numberOfRooms),
            image: this.state.image,
            parkingSlots: Number(this.state.parkingSlots)
        };
        //validations
        const errorMessage = { message: '', errors: {}};
        if (hotel.description.length < 10) {
            errorMessage.message = 'Check the form for errors';
            errorMessage.errors.description = 'Description must be more than 10 symbols.';
        }
        if (isNaN(hotel.numberOfRooms) || hotel.numberOfRooms <= 0) {
            errorMessage.message = 'Check the form for errors';
            errorMessage.errors.numberOfRooms = 'Number of Rooms must be a positive number';
        }
        //if error is aviable set it in state and break the request
        if (errorMessage.message) {
            this.setState({error: errorMessage, submitting: false});
            return;
        }
        //else clean error and do request
        this.setState({ error: false });
        const res = await create(hotel);

        //chech request for problems, if errors set them and return
        if (!res.success) {
            this.setState({ error: res, submitting: false });
            return;
        }
        this.setState({ submitting: false });    
        // if no problems redirect    
        this.props.history.push('/');
    }

    render(){
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 style={{color: 'red'}}>{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(k => {
                        return <p key={k}>{this.state.error.errors[k]}</p>;
                    })}
                </div>
            );
        }

        return(
            <div className="container">
                <h3>Create Form</h3>
                {errors}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                    label="Hotel Name" />
                    <Input
                    name="location"
                    type="text"
                    value={this.state.location}
                    onChange={this.onChangeHandler}
                    label="Location" />
                    <Input
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.onChangeHandler}
                    label="Description" />
                    <Input
                    name="numberOfRooms"
                    type="number"
                    value={this.state.numberOfRooms}
                    onChange={this.onChangeHandler}
                    label="Number of Rooms" />
                    <Input
                    name="image"
                    type="text"
                    value={this.state.image}
                    onChange={this.onChangeHandler}
                    label="Image URL" />
                    <Input
                    name="parkingSlots"
                    type="number"
                    value={this.state.parkingSlots}
                    onChange={this.onChangeHandler}
                    label="Parking Slots" />
                    <input type="submit" value="Create" disabled={this.state.submitting}/>
                </form>
            </div>
        );
    }
}

export default withRouter(CreatePage);