import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse, formatJSONResponse404 } from '@libs/apiGateway';

import * as products from '../../../products.json';
import { Product } from 'src/models/product.model';


export const getProductsById: APIGatewayProxyHandler = async (event) => {
  const { productId } = event.pathParameters;
  const product: Product = (products.default as Product[]).find(product => product.id === productId);

  if (!product) {
    return await formatJSONResponse404({ message: 'Product not found' });
  }
  return await formatJSONResponse({ body: product });
}