import { Component } from "react";
import { connect } from 'react-redux'
import Header from "../pages/Header";
import store from "../redux/store";
import minus from '../icons/minus.svg'
import plus from '../icons/plus.svg'
import './cart.css'


class Payment extends Component {

    state = {
        products: [],
        sizes: ["XS", "S", "M", "L"],
        colors: ["gray", "black", "red"]
    }


    onOrder = () => {
        window.dataLayer.push({
            'event': 'checkout',
            'ecommerce': {
                'currencyCode': 'USD',
                'checkout': {
                    'actionField': { step: 1, option: "CartPage" },
                    'products': [...this.state.products]
                }
            }
        })
    }

    calculateDetails = (text) => {
        if (text == 'tax') {
            const count = this.props.products.reduce((prev, next) => prev + (+next.count + (+next.price)), 0)
            return (count * 0.21).toFixed(2)
        } else if (text == 'quantity') {
            const count = this.props.products.reduce((prev, next) => prev + next.count, 0)
            return count
        } else {
            const count = this.props.products.reduce((prev, next) => prev + (+next.count + (+next.price)), 0)
            return count
        }

    }


    componentDidMount() {

        const state = store.getState()
        this.setState({ products: state.products })
        console.log(state.products)

    }


    render() {
        console.log("Payment", this.props.products)
        return (
            <>
                <Header />
                <div className="cartpage">
                    <h1 className="cartTitle">CART</h1>
                    {this.state.products?.map((product, index) => {

                        return (<div className="userOrder" key={index}>
                            <div id="informationSection">
                                <div className="cartinfoside">
                                    <p>{product.name}</p>
                                    <br />
                                    <p id="size">SIZE:</p>
                                    <div className="sizeSelector">
                                        {this.state.sizes.map((data, index) => {
                                            if (data == product.size) {
                                                return (<p key={index} style={{ backgroundColor: "black", color: "white" }}>{data}</p>)
                                            } else {
                                                return (<p key={index}>{data}</p>)
                                            }
                                        })}
                                    </div>
                                    <p id="color">COLOR:</p>
                                    <div className="colorSelector">
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
                                    <p id="priceinnumber">{product.price}</p>
                                </div>
                                <div className="cardpictureside">
                                    <img src={plus} alt="plus" style={{ width: "45px", height: "45px" }} />
                                    <div>
                                        <img className="banner" src={product.image} alt="product img" />
                                        <div className="arrowList">
                                            <span className="arrow">&#60;</span>
                                            <span className="arrow">&#62;</span>
                                        </div>
                                    </div>
                                    <img src={minus} alt="minus" style={{ width: "45px", height: "45px" }} />
                                </div>
                            </div>
                        </div>)

                    })}

                    <p>Tax 21%: <span className="blackText">{this.props.curSign} {this.calculateDetails('tax')}</span></p>
                    <p >Quantity: <span className="blackText">{this.calculateDetails('quantity')}</span></p>
                    <p >Total: <span className="blackText">{this.props.curSign} {this.calculateDetails('totla')}</span></p>
                    <button>Order</button>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    const { currency, curArray } = state
    const sign = curArray.find(elem => elem.key == currency)
    return { ...state, curSign: sign.sign }
}

export default connect(mapStateToProps)(Payment)
