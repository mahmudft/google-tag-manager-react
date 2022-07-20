import React, { Component } from 'react'
import store from "../redux/store";
import minus from '../icons/minus.svg'
import plus from '../icons/plus.svg'
import './overlay.css'
import { withRouter } from 'react-router-dom';


class CartOverLay extends Component {
    state = {
        products: [],
        sizes: ["XS", "S", "M", "L"],
        colors: ["gray", "black", "red"]
    }


    componentDidMount() {

        const state = store.getState()
        this.setState({ products: state.products })
        console.log(state.products)

    }

    totalCount = () => {
        let elem =  this.state.products.reduce((previous, next) => previous.count + next.count, 0)
        return elem
    }

    totalAmount = () =>{
        const total = this.state.products.reduce((previous, next) => previous.count + (next.count * next.price), 0)
        return total
    }

    goTOCard = () => {
        this.props.history.push('/cart')
    }
    render() {
        return (
            <div className='shopping-cart'>
                <h1 className="shopping-title">My Bag: {this.state.products.reduce((previous, next) => previous + next.count, 0)}</h1>
                {this.state.products?.map((product, index) => {

                    return (
                        <div className="order" key={index}>
                            <div className="shoppinginfosection">
                                <p>{product.name}</p>
                                <p className='blackText'>{this.props.currency} {product.price}</p>
                                <p>Size:</p>
                                <div className="shoppingsize">
                                    {this.state.sizes.map((data, index) => {
                                        if (data == product.size) {
                                            return (<p key={index} style={{ backgroundColor: "black", color: "white" }}>{data}</p>)
                                        } else {
                                            return (<p key={index}>{data}</p>)
                                        }
                                    })}
                                </div>
                                <p>Color:</p>
                                <div className="shoppingcolor">
                                    {
                                        this.state.colors.map((color, index) => {
                                            if (color == product.color) {
                                                return (<div style={{ backgroundColor: `${color}`, border: "2px solid green" }}></div>)
                                            } else {
                                                return (<div style={{ backgroundColor: `${color}` }}></div>)
                                            }
                                        })

                                    }

                                </div>
                            </div>
                            <div className="shoppingpictures">
                                <img src={plus} alt="plus" style={{ width: "24px", height: "24px" }} />
                               <p>{product.count}</p>
                                <img src={minus} alt="minus" style={{ width: "24px", height: "24px" }} />
                            </div>
                            <img className="shoppingbanner" src={product.image} alt="product img" />
                        </div>
                    )

                })}
                <div>
                    <span className='blackText'>Total</span>
                    <span className='blackText' style={{float: 'right'}}>{this.props.currency} {this.state.products.reduce((previous, next) => previous + (next.count * next.price), 0)}</span>
                </div>
                
                <div className='buttons'>
                    <button className='shoppingButton viewbutton' onClick={() => this.goTOCard()}>VIEW BAG</button>
                    <button className='shoppingButton'>CHECK OUT</button>
                </div>
            </div>
        )
    }
}

export default withRouter(CartOverLay)