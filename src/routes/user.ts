import { Hono } from 'hono';
import { Database } from '../services/database';
import { Env } from '../types/sharedTypes';

const user = new Hono<{ Bindings: Env }>();

user.get('/:address', async (c) => {
    const address = c.req.param('address').toLowerCase();
    const envr: Env = c.env;
    const database = new Database(envr);
    const clientId = await database.getClientByAddress(address);
    const addresses = await database.getWallets(clientId);
    
    return c.json({ success: true, data: addresses });
});

user.post('/add-address/:address/:newAddress', async (c) => {
    const address = c.req.param('address').toLowerCase();
    const newAddress = c.req.param('newAddress').toLowerCase();

    const envr: Env = c.env;
    const database = new Database(envr);
    const client = await database.getClientIdByAddress(address);
    if (client === 0) {
        return c.json({ success: false, error: 'Address not found' });
    }
    const result = await database.createRelationsByAddress(address, newAddress);
    
    return c.json({ success: true, result });
});

export default user;
