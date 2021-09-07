import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getProductsById } from '../functions/getProductsById/handler';
import * as products from '../../products.json';

describe('Unit test for getProductsById handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a0'
            }
        } as any;
        const result = await getProductsById(event, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify(products.default.find(product => product.id === '7567ec4b-b10c-48c5-9345-fc73c48a80a0')));
    });

    it('verifies 404 Product not found response', async () => {
        const event: APIGatewayProxyEvent = {
            pathParameters: {
                productId: '111'
            }
        } as any
        const result = await getProductsById(event, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toEqual(404);
        expect(result.body).toEqual(JSON.stringify({ message: 'Product not found' }));
    });
});