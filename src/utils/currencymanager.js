
function productConverter(currency, product) {
    const copiedProduct = {...product}
    if (currency == 'usd') {
        return copiedProduct
    } else if (currency == 'eur') {

        copiedProduct.price = (Number(copiedProduct.price) * 0.98).toFixed(2)
        return copiedProduct
    } else if (currency == 'jpy') {
        copiedProduct.price = (Number(copiedProduct.price) * 137.5).toFixed(2)
        return copiedProduct

    }

}


function categoryConverter(currency, products) {
    if (currency == 'usd') {
        return products
    } else if (currency == 'eur') {
        const newProducts = products.map((elem) => {
            elem.price = (Number(elem.price) * 0.98).toFixed(2)
            return elem

        })
        return newProducts
    } else if (currency == 'jpy') {
        const newProducts = products.map((elem) => {
            elem.price = (Number(elem.price) * 137.5).toFixed(2)
            return elem

        })
        return newProducts
    }

}

export {productConverter, categoryConverter}

