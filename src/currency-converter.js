'use strict'

const converter = require('./converter')

module.exports.currencyConverter=(event,context,callback) => {
    const base = event.pathParameters.base;
    console.log(base)
    const symbols = event["queryStringParameters"]['symbols'];
    console.log(symbols)
    
    const amt = event["queryStringParameters"]["amt"];
    const splitSymbols = symbols.split(',')
    converter.getAllCurrencyValue()
    .then((result1) =>{
      return baseToSymbols(result1,base,splitSymbols,amt)
    })
    .then((result2) =>{
        console.log(result2)
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(result2)
        })
    })
    .catch((exception) => console.log(`Error in conversion ${exception}`))
    }
    
    const baseToSymbols = (result, base, splitSymbols,amt) => {
        return new Promise((resolve,reject) =>{
            result = JSON.parse(result);
            const valueBase = result.rates[base];
            let valueArray = [];
            splitSymbols.forEach((element) => {
                let value = {
                    element:element,
                    currentValue: ((result.rates[element] / valueBase).toFixed(3))*amt
                };
                valueArray.push(value)
            });
            console.log('final array ',valueArray)
            resolve(valueArray);    
        })    
    }
    