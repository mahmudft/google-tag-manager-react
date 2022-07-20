import React, { Component } from 'react'
import Header from '../pages/Header'
import store from '../redux/store'
import {categoryConverter} from '../utils/currencymanager'
import Product from './Product'
import {connect} from 'react-redux'

class Card extends Component {
    state = {
        products: [],
        category: 'ALL'
    }
    componentDidMount() {
        const state = store.getState()
        fetch('data.json')
            .then(response => response.json())
            .then(products => {
                this.setState({ products:  categoryConverter(state.currency, products)})
                window.dataLayer.push({ "event": "impressions", "ecommerce": {
                    "currencyCode": this.props.currency,
                    "impressions": categoryConverter(state.currency, products)
                }})
            })
            .catch(err => console.log(err))
    }


    onOnchnageProduct = (category) => {
        const state = store.getState()
        console.log(category)
        this.setState({ category: category }, () => {
            fetch('data.json')
                .then(response => response.json())
                .then(products => {
                    let demos = products.filter(elem => elem.category == category.toLowerCase())
                    window.dataLayer.push({
                        "event": "impressions", "ecommerce": {
                            "currencyCode": this.props.currency,
                            "impressions": categoryConverter(state.currency, demos)
                        }
                    })
                    this.setState({ products: categoryConverter(state.currency, demos)})
                }
                )
                .catch(err => console.log(err))

        })
    }

    render() {
        return (
            <>
                <Header changeProductType={this.onOnchnageProduct} selectedCategory={this.state.category} />
                <p style={{ paddingLeft: "6.5%"}}>Category name: {this.state.category}</p>
                <main className='cart'>
                    {this.state.products?.map((elem, index) => <Product key={index} {...elem} sign={this.props.curSign} Currency={this.props.currency}/>)}
                </main>
            </>
        )
    }
}
function mapStateToProps(state) {
    const { currency, curArray } = state
    const sign = curArray.find(elem => elem.key ==currency)
    return { currency, curSign: sign.sign }
}
export default connect(mapStateToProps)(Card)