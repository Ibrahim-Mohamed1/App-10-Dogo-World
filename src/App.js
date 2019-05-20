import React, { Component } from 'react';
import { withData } from './DataProvider';
import { breeds } from "./Breeds"
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: "",
      dogs: [],
      toggle: true
    }
  }
  componentDidMount() {
    this.props.getDog()
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
  }
  handleSubmit = () => {
    this.props.getDog(this.state.value)
  }
  rating = (e) => {
    e.preventDefault()
    this.state.dogs.push([this.props.dog, e.target.value])
    this.props.getDog(this.state.value)
  }
  handleToggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }))
  }
  render() {
    const styles = {
      dog: {
        height: 250,
        width: 300,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        margin: "1%"
      }
    }
    const mapp = breeds.map(bred => {
      return (
        <option key={bred} value={bred}>{bred}</option>
      )
    })
    const ratedDogs = this.state.dogs.map(bred => {
      return (
        <div key={bred[0]} style={{ ...styles.dog, backgroundImage: `url(${bred[0]})` }}>
          <span style={{ backgroundColor: 'white', color: 'black', fontSize: 20, float: "left" }}>Rate: {bred[1]}</span>
        </div>
      )
    })
    return (
      <>
        <h1 style={{ margin: "1%", color: 'red' }}><img alt='' style={{width: 50}} src="https://png.pngtree.com/svg/20170106/a2ce4c869e.png"/> Dog World <img alt='' style={{width: 50}} src="https://png.pngtree.com/svg/20170106/a2ce4c869e.png"/></h1>
        {this.state.toggle ?
          <div>
            <select onChange={this.handleChange}>
              <option>Please select a breed</option>
              {mapp}
            </select>
            <br />
            {this.state.value === "" ?
              null
              :
              <>
                <button onClick={this.handleSubmit}>Search</button>
                {this.props.dog === "" ?
                  null
                  :
                  <>
                    {this.state.dogs && this.state.dogs.length === 0 ?
                      null
                      :
                      <button onClick={this.handleToggle}>Dashboard</button>
                    }
                    <div>
                      <h2 style={{ margin: "1%" }}>Rate me please? </h2>
                      <button value="10" onClick={this.rating}>10</button>
                      <button value="11" onClick={this.rating}>11</button>
                      <button value="12" onClick={this.rating}>12</button>
                      <button value="13" onClick={this.rating}>13</button>
                      <br></br>
                      <button value="14" onClick={this.rating}>14</button>
                      <button value="15" onClick={this.rating}>15</button>
                      <button value="16" onClick={this.rating}>16</button>
                      <br style={{ marginBottom: 10 }} />
                      <img style={{ width: 300 }} src={this.props.dog} alt="" />
                    </div>
                  </>
                }
              </>
            }
          </div>
          :
          <div style={{ textAlign: "center" }}>
            <button onClick={this.handleToggle}>Back</button>
            <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: 'wrap' }}>
              {ratedDogs}
            </div>
          </div>
        }
      </>
    );
  }
}

export default withData(App);