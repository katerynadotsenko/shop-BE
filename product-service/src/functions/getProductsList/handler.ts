import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse, formatJSONResponseMessage } from '@libs/apiGateway';
import { Client } from 'pg';

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

export const getProductsList: APIGatewayProxyHandler = async (event) => {
  console.log('GET PRODUCTS LIST: ', event);
  const client = new Client(dbOptions);

  try {
    await client.connect();
    const productsData = await client.query(`select p.id, p.title, p.description, p.price, s.count from products as p left join stocks as s on p.id=s.product_id`);

    return formatJSONResponse({ body: productsData.rows });
  } catch (error) {
    console.log('ERROR: ', error)

    return formatJSONResponseMessage({ message: 'Server Error', statusCode: 500 });
  } finally {
    await client.end();
  }
}