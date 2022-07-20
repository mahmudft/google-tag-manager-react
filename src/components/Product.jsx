import React, { Component } from 'react'
import ADD from '../icons/circle_cart.svg'
import { Redirect } from 'react-router-dom'
import { productConverter } from '../utils/currencymanager'

class Product extends Component {

    state = {
        active: false,
        redirect: false
    }


    handleMouseOver = () => {
        this.setState({ active: true })
    }

    handleMouseOut = () => {
        this.setState({ active: false })
    }

    redirectDetails = () =>{
        window.dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                    'actionField': { 'list': 'Product Page' },      // Optional list property.
                    'products': [productConverter(this.props.Currency, this.props)]
                }
            }})
        this.setState({redirect: true})

    }

    render() {
        const url = `/product/${this.props.id}`
        if (this.state.redirect) {
            return <Redirect to={url} />
        }

        const product = productConverter(this.props.Currency, this.props)
        return (
            <>
                <div className='product' onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOut} onClick={this.redirectDetails}>
                    <img src={product.image} alt="deskkjkkk" className='productImage' />
                    {this.state.active && <img className='addcard' src={ADD} alt="tinyicon" />}
                    <p>{product.name}</p>
                    <p><b>{product.sign} {product.price}</b></p>
                </div>
            </>
        )
    }
}

export default Product