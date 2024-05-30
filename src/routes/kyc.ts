import { Hono } from 'hono';
import { Web3 } from '../services/ethereum';
import { Database } from '../services';
import { Env } from '../types/sharedTypes';

const kyc = new Hono<{ Bindings: Env }>();

kyc.get('/:address/:providerId{[0-9]+}', async (c) => {
    const address = c.req.param('address').toLowerCase();
    const providerId = c.req.param('providerId');

    const envr: Env = c.env;
    const database = new Database(envr);

    try {
        const kycData = await database.getRelationByAddress(address);
        const web3 = new Web3(envr);
        const isAdult = kycData.isAdult === 1 ? true : false;
        const parsedData = await web3.parseData(
            kycData.yearOfBirth,
            isAdult,
            kycData.countryCode,
            kycData.creditScore
        );
        return c.json({ parsedData });
    }
    catch (error) {
        return c.json({ success: false, error: "Failed to get KYC" })
    }
});

export default kyc;
