import { Component } from "react";
import { withRouter } from 'react-router-dom'
import Header from "../pages/Header";
import store from "../redux/store";
import './details.css'
import {v4 as ui4} from 'uuid'

class ProductDetail extends Component {
    state = {
        item: '',
        selectedSize: '',
        sizes: ["XS", "S", "M", "L"]
    }

    addtocard = () => {
        const data = {...this.state.item, uid: ui4(), count: 1}
        window.dataLayer.push({
            'event': 'addToCart',
            'ecommerce': {
                'currencyCode': 'USD',
                'add': {
                    'products': [{...data, dimenision1: this.state.item.id, dimension2: this.state.item.title }]
                }
            }
        })
        store.dispatch({
            type: "ADD_TO_CARD",
            payload: {
                data
            }
        })
        this.props.history.push('/')
    }

    manageColor = (e) => {
        this.setState({item: {...this.state.item, color: e}}, function(){
            console.log(this.state.item)
        })
    }

    manageSize = (e) => {
        this.setState({item: {...this.state.item, size: e}, selectedSize: e}, function(){
            console.log(this.state.item)
        })
    }
    

    componentDidMount() {
        console.log(this.props.match.params.id)
        fetch('http://localhost:3000/data.json')
            .then(res => res.json())
            .then(data => {
                const product = data.filter(elem => elem.id == this.props.match.params.id)
                window.dataLayer.push({
                    'event': 'detail',
                    'ecommerce': {
                        'detail': {
                            'products': [this.props]
                        }
                    }
                })
                this.setState({ item: product[0] }, function () {
                    console.log(this.state.item.image)
                })
            })
    }


    render() {
        console.log(this.props)
        return (
            <>
                <Header />

                <main className="productdetail">
                    <div className="imageList">
                        <img src={this.state.item.image} alt="test" />
                        <img src={this.state.item.image} alt="test" />
                        <img src={this.state.item.image} alt="test" />
                    </div>
                    <div className="mainImage">
                        <img src={this.state.item.image} alt="mainimg" />
                    </div>
                    <div id="infoSection">
                        <p>{this.state.item.name}</p>
                        <br />
                        <p id="size">SIZE:</p>
                        <div className="sizeSelector">
                            {this.state.sizes.map((elem)=> {
                                if(elem == this.state.selectedSize){
                                    return (<p style={{color: 'white', backgroundColor: 'black'}} onClick={() => this.manageSize(elem)}>{elem}</p>)
                                } else {
                                    return (<p onClick={() => this.manageSize(elem)}>{elem}</p>)
                                }
                            })}
                           
                        </div>
                        <p id="color">COLOR:</p>
                        <div className="colorSelector">
                            <div onClick={() => this.manageColor("gray")} style={{ backgroundColor: 'gray' }}></div>
                            <div onClick={() => this.manageColor("black")} style={{ backgroundColor: 'black' }}></div>
                            <div onClick={() => this.manageColor("green")} style={{ backgroundColor: 'green' }}></div>

                        </div>
                        <p id="price">PRICE:</p>
                        <p id="priceinnumber">$ {this.state.item.price}</p>

                        <button onClick={this.addtocard}>ADD TO CART</button>
                        <p style={{ wordBreak: "break-all"}}>
                            Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.
                        </p>
                    </div>
                </main>

            </>


        )
    }
}

export default withRouter(ProductDetail);