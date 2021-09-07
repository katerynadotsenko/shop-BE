import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse, formatJSONResponseMessage } from '@libs/apiGateway';

import * as products from '../../../products.json';
import { Product } from 'src/models/product.model';


export const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log('GET PRODUCT BY ID: ', event);

  try {
    const { productId } = event.pathParameters;
    const product: Product = (products.default as Product[]).find(product => product.id === productId);

    if (!product) {
      return await formatJSONResponseMessage({ message: 'Product not found', statusCode: 404 });
    }
    return await formatJSONResponse({ body: product });
  } catch (error) {
    console.log('ERROR: ', error)

    return await formatJSONResponseMessage({ message: 'Server Error', statusCode: 500 });
  }
}