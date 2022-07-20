
let initialState = {
    products: [{
        "id": 5,
        "name": "John Hardy Women's Legends",
        "price": 695,
        "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        "category": "jewelery",
        "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "rating": {
            "rate": 4.6,
            "count": 400
        },
        "size": "M",
        "color": "red",
        "uid": "e6810430-6e53-4dc1-95c0-15847778c4eb",
        "count": 5
    }],
    currency: "usd",
    curArray: [{ "key": 'usd', 'sign': '$' }, { "key": 'eur', 'sign': '€' }, { "key": 'jpy', 'sign': '¥' }]
}


//window.state = initialState

export default function reducer(state=initialState, action){
    switch (action.type) {
        case "ADD_TO_CARD":
            const products = [...state.products, action.payload.data]
            console.log("ADD_TO_CART", products)
            window.state = state

            return {
                ...state, products
            }
        case "CHANGE_COUNT":
            const data = state.products.forEach(elem => {
                if(elem.uid === action.payload.changes.uid){
                    elem.count = action.payload.changes.count
                    return elem
                    
                }
                return elem
            })

            return {
                ...state, products: data
            }
        case "CHANGE_CURRENCY":
            return {
                ...state, currency: action.payload.currency
            }
        default:
            return state;
    }
    
}