let isRealString =  (str) => {
    return typeof str === 'string' && str.trim().length > 2; 
}

module.exports = {isRealString}