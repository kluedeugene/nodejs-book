// const value= require('./var')
const {odd, even}= require('./var')

function checkOddEven(number){
    if (number %2){
        return odd;
    }else{
        return even;
    }
}
module.exports= checkOddEven;