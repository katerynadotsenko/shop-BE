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

export const createProduct: APIGatewayProxyHandler = async (event) => {
  console.log('CREATE PRODUCT: ', event);
  const client = new Client(dbOptions);

  try {
    const { title, description, price, count } = JSON.parse(event.body);

    await client.connect();
    await client.query(`BEGIN`);
    await client.query(`SAVEPOINT SP1`);

    const hasUnsupportedParams = Object.keys(JSON.parse(event.body))
      .find(param => param !== 'title' && param !== 'description' && param !== 'price' && param !== 'count');

    if (!title || hasUnsupportedParams) {
      const error = `Product data is invalid. ${!title ? 'Title is required.' : ''} ${hasUnsupportedParams ? 'There are unsupported params.' : ''}`;

      console.log(`ERROR: ${error}`);
      return formatJSONResponseMessage({ message: error, statusCode: 400 });
    }

    const insertProductQuery = {
      text: 'insert into products (title, description, price) values ($1, $2, $3) returning id',
      values: [title, description || '', price || 0]
    };
    const result = await client.query(insertProductQuery.text, insertProductQuery.values);
    const productId = result.rows[0].id;
    const insertStockQuery = {
      text: 'insert into stocks (product_id, count) values ($1, $2)',
      values: [productId, count || 0]
    };

    await client.query(insertStockQuery.text, insertStockQuery.values);

    return formatJSONResponse({ body: { id: productId } });
  } catch (error) {
    console.log('ERROR: ', error);

    await client.query(`ROLLBACK TO SP1`);
    return formatJSONResponseMessage({ message: 'Server Error', statusCode: 500 });
  } finally {
    await client.query(`COMMIT`);
    await client.end();
  }
}