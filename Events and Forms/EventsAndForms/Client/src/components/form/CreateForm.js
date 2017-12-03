import React, { Component } from 'react';

import Input from './formFields/Input';
import PokemonField from './formFields/PokemonField';

class CreateForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            pokemonName: '',
            pokemonImg: '',
            pokemonInfo: '',
            data: { pokemonColection: [] }
        };
    }

    createPokemon(e){
        e.preventDefault();
        const payload = {
            pokemonName: this.state.pokemonName,
            pokemonImg: this.state.pokemonImg,
            pokemonInfo: this.state.pokemonInfo
        };

        this.createPokemonToServer(payload);
    }

    componentDidMount(){
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data);
                // this.state.data.pokemonColection = data.pokemonColection;
                this.setState({ data: data });
            });
    }

    createPokemonToServer(payload){
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
            })
            .then(res => {
                return res.json();
            })
            .then(d => {
                fetch('http://localhost:5000/pokedex/pokedex')
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    // console.log(data);
                    // this.state.data.pokemonColection = data.pokemonColection;
                    this.setState({ data: data });
                });
              });
    }


    render(){
        const validName = this.state.pokemonName !== '';
        const validImg = this.state.pokemonImg.startsWith('http');
        const validInfo = this.state.pokemonInfo.length > 3 && this.state.pokemonInfo.length < 50;
        return (
            <div>
                <form onSubmit={this.createPokemon.bind(this)}>
                    <fieldset className="App">
                        <div style={{ display: 'inline-grid' }}>
                            <h2> Logged </h2>
                            <Input 
                            type="text"
                            name="Pokemon Name"
                            data="pokemonName" 
                            valid={validName} 
                            func={e => {
                                this.setState({ pokemonName: e.target.value });
                            }}/>
                            <Input 
                            type="text"
                            name="Pokemon Image"
                            data="pokemonImg" 
                            valid={validImg} 
                            func={e => {
                                this.setState({ pokemonImg: e.target.value });
                            }}/>
                            <Input 
                            type="text"
                            name="Pokemon Info"
                            data="pokemonInfo" 
                            valid={validInfo} 
                            func={e => {
                                this.setState({ pokemonInfo: e.target.value });
                            }}/>
                            <input type="submit" 
                            value="Create"
                            style={({ 'display': (validInfo && validImg && validName) === true ? '' : 'none' })} />
                        </div>
                    </fieldset>
                </form>
                <div>
                    {this.state.data.pokemonColection.map((p, i) => {
                        return (
                        <PokemonField 
                        key={i}
                        data={p}/>
                        );
                    })}
                </div>
            </div>
            
        );
    }
}

export default CreateForm;