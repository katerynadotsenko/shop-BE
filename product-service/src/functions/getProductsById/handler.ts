import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse, formatJSONResponseMessage } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { Client } from 'pg';
import { UUIDv4 } from 'uuid-v4-validator'

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
}

const getProductsById: APIGatewayProxyHandler = async (event) => {
  console.log('GET PRODUCT BY ID: ', event);
  const client = new Client(dbOptions);

  try {
    const { productId } = event.pathParameters;
    const isProductIdValid = UUIDv4.validate(productId);

    if (!isProductIdValid) {
      return formatJSONResponseMessage({ message: 'Product not found. Invalid uuid', statusCode: 404 });
    };

    const query = {
      text: 'select p.id, p.title, p.description, p.price, s.count from products as p left join stocks as s on p.id=s.product_id where p.id=$1',
      values: [productId]
    };

    await client.connect();
    const productData = await client.query(query.text, query.values);

    if (!productData.rows.length) {
      return formatJSONResponseMessage({ message: 'Product not found', statusCode: 404 });
    }

    return formatJSONResponse({ body: productData.rows[0] });
  } catch (error) {
    console.log('ERROR: ', error)

    return await formatJSONResponseMessage({ message: 'Server Error', statusCode: 500 });
  } finally {
    await client.end();
  }
}

export const main = middyfy(getProductsById);