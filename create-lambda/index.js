'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const peopleModel = require('./people.schema.js');

exports.handler = async (event) => {
  try{
    // first, we get the data from the req.body
    const {name, phone} = JSON.parse(event.body); //object destructuring
    
    // make a unique id for this record
    const id = uuid();

    // make the record based on our dynamoose schema
    const record = new peopleModel({ id, name, phone });
    // save the record to the DB (DynamoDB)
    const data = await record.save();

    // return the newly saved record and a status code of 200
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch(err) {
    return{
      statusCode: 500,
      response: err.message
    }
  }
}