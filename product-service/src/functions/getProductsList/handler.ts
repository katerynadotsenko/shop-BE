import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';

import * as products from '../../../products.json';


export const getProductsList: APIGatewayProxyHandler = async (event) => {
  return formatJSONResponse({ message: products.default });
}