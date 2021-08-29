import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse, formatJSONResponseMessage } from '@libs/apiGateway';

import * as products from '../../../products.json';


export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log('GET PRODUCTS LIST: ', event);

  try {
    return await formatJSONResponse({ body: products.default });
  } catch (error) {
    console.log('ERROR: ', error)

    return await formatJSONResponseMessage({ message: 'Server Error', statusCode: 500 });
  }
}