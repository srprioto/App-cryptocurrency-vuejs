const dolarFilter = (value) => { 
    return `$ ${Math.round(value * 100) / 100}`
}

const percentFilter = (value) => {
    if (!value) {
        return 0;
    }
    return `${Number(value).toFixed(2)}%`
}




export {
    percentFilter,
    dolarFilter
}