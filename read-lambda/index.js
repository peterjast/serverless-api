'use strict';

const dynamoose = require('dynamoose');
const peopleModel = require('./people.schema.js');

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id || event.pathParameters && event.pathParameters.id;
    let data;
    if (id) {
        const list = await peopleModel.query("id").eq(id).exec();
        data = list[0];
    } else {
        data = await peopleModel.scan().exec();
    }
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
  } catch (e) {
      return {
          statusCode: 500,
          message: e.message
      }
  }
}