import Store from '../icons/store.svg'
import Cart from '../icons/cart.svg'
import React, { Component } from 'react';
import CartOverLay from '../components/CartOverLay';
import store from '../redux/store';
import {connect} from 'react-redux'
import Currency from '../components/Currency';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {
        currency: '',
        activeModal: false, 
        categories: ['WOMEN', "MEN", "KIDS"],
        cartCount: ''
    }


    handleCurrency = (e) => {
        this.setState({ currency: e.target.value })
    }

    showModal = () => {
        this.setState({activeModal: !this.state.activeModal})
    }

    changeCategory = (value) => {
        this.props.changeProductType(value)
    }

    componentDidMount(){
            const state = store.getState()
            const products = state.products

            console.log(products.reduce((prev, next) => prev + next.count, 0))
            this.setState({currency: state.currency, cartCount: products.reduce((prev, next) => prev + next.count, 0)})
    }


    render() {
        console.log("HEader", this.props)
        const category  = this.props.selectedCategory
        console.log(category)
        return (
            <>
                <nav>
                    <div className='navbarCategory'>
                        {this.state.categories.map((elem, index) => {
                            if(elem == category){
                                return (<span key={index} style={{borderBottom: '2px solid green', color: 'green'}} onClick={() => this.changeCategory(elem)}>{elem}</span>)
                            } else {
                                return (<span key={index} onClick={() => this.changeCategory(elem)}>{elem}</span>)
                            }
                        })}
                    </div>
                    <div className='navbarLogo'>
                        <Link to='/'><img src={Store} alt="store" /></Link>
                    </div>
                    <div className='navbarEnd'>
                        <Currency/>
                        <img src={Cart} alt="store" onClick={this.showModal} />
                        <div className='shoping-counter'>{this.props.products.reduce((prev, next) => prev + next.count, 0)}</div>
                    </div>
                </nav>
                {this.state.activeModal && <CartOverLay currency={this.state.currency}/>}
            </>

        )
    }
}

function mapStateToProps(state) {
    const { products, currency } = state
    return { products, currency }
}

export default connect(mapStateToProps)(Header);
