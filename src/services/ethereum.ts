import { ethers } from 'ethers';
import { Env } from '../types/sharedTypes';

import KycAggregatorABI from '../abis/KycAggregator.json';

export class Web3 {
    private provider: ethers.JsonRpcProvider;

    constructor(envr: Env) {
        this.provider = new ethers.JsonRpcProvider(envr.RPC_URL);
    }

    async getContract(): Promise<ethers.Contract> {
        const address = '0xdBbe87d0097F2B2381d67817EDA8f4E8bd2CCd46';
        return new ethers.Contract(address, KycAggregatorABI, this.provider);
    }

    async parseData(
        year: number,
        adult: boolean,
        country: number,
        score: number
    ): Promise<string> {
        const contract = await this.getContract();
        const result = await contract.parseData(year, adult, country, score);
        return result.toString();
    }
} 
