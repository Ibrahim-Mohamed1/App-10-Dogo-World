import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor() {
        super()
        this.state = {
            dog: ''
        }
    }
    getDog = (breed) => {
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random`).then(res => {
            this.setState({
                dog: res.data.message
            })
        }).catch(function (error) { 
            window.location.reload() 
        });
    }
    render() {
        return (
            <Provider value={{
                getDog: this.getDog,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}
export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}