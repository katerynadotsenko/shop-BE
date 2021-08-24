import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';

import * as products from '../../../products.json';
import { Product } from 'src/models/product.model';


export const getProductsById: APIGatewayProxyHandler = async (event) => {
  const { productId } = event.pathParameters;
  const product: Product = (products.default as Product[]).find(product => product.id === productId);

  return formatJSONResponse({ message: product });
}