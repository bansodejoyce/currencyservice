'use strict';

const http = require('http');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

module.exports.currencyValues = (event, context, callback) => {

  getAllCurrencyValue()
    .then((result) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: `Current currency details are`,
          currencyDetails: result
        })
      })
    })
    .catch((exception) => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Something went wrong!! ${exception}`,
        })
      })
    })
};

const getAllCurrencyValue = () => {
  return new Promise((resolve,reject)=>{
   http.get('http://data.fixer.io/api/latest?access_key=47173ef6e1b30e8b4dcc288c0f5d176a', (response) => {
       let data ='';
       response.on('data', (chunk) => {            
           data += chunk;            
       })
       response.on('end',()=>resolve(data))
   }).on('error',(error)=> reject(error))
  })  
}