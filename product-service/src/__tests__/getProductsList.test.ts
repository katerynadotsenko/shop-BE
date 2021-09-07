import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getProductsList } from '../functions/getProductsList/handler';
import * as products from '../../products.json';

describe('Unit test for getProductsList handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {} as any;
        const result = await getProductsList(event, null, null) as APIGatewayProxyResult;

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify(products.default));
    });
});