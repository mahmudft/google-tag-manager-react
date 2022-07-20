import React, { Component } from 'react'
import store from '../redux/store'
import './currency.css'
import {connect} from 'react-redux'
import UP from '../icons/uparrow.svg'
import DOWN from '../icons/downarrow.svg'

 class Currency extends Component {
    state = {
        currencies: [{ "key": 'usd', 'sign': '$' }, { "key": 'eur', 'sign': '€' }, { "key": 'jpy', 'sign': '¥' }],
        currentCurrency: 'usd',
        currentSign: '$',
        isOpen: false
    }
    componentDidMount(){
      
            const state = store.getState()
            this.setState({currentCurrency: state.currency})

    }

    handleMouseEnter =() => {
        this.setState({isOpen: !this.state.isOpen})
    }
     handleMouseLeave = () => {
         this.setState({ isOpen: !this.state.isOpen })
     }
    

    
    handleChange = (e) => {
        const cur = this.state.currencies.find((elem) => (elem.key == e))
        console.log(cur.sign)
        this.setState({currentSign: cur.sign})
        store.dispatch({
            type: "CHANGE_CURRENCY",
            payload: {
                currency: e
            }
        })
    }
    render(){
        return(
            // <select defaultValue={this.props.curSign} onChange={this.handleChange}>
            //     {this.state.currencies.map((elem, index) => {
            //         if(elem.key == this.state.currentCurrency){
            //             return (< option key={index} selected value={elem.key} >{elem.sign} {elem.key.toUpperCase()}</option>)
            //         } else {
            //             return (< option key={index} value={elem.key} >{elem.sign} {elem.key.toUpperCase()}</option>)
            //         }
            //     })}
            // </select>
            <div className="dropdown" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <button className='dropbutton'>{this.props.curSign} {this.state.isOpen ? <img src={DOWN} alt='down' /> : <img src={UP} alt='up' />}</button>
                <div className="dropdown-content">
                    {this.state.currencies.map((elem, index) => {
                    if(elem.key == this.state.currentCurrency){
                        return (<span key={index} value={elem.key} onClick={() => this.handleChange(elem.key)}>{elem.sign} {elem.key.toUpperCase()}</span>)
                    } else {
                        return (<span key={index} value={elem.key} onClick={() => this.handleChange(elem.key)}>{elem.sign} {elem.key.toUpperCase()}</span>)
                    }
                })}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { currency, curArray } = state
    const sign = curArray.find(elem => elem.key == currency)
    return { currency, curSign: sign.sign }
}
export default connect(mapStateToProps)(Currency)