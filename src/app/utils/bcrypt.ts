import bcrypt from 'bcrypt';
import config from '../config';

export const encodeDatabyBcrypt = async(data: string) => {
    return await bcrypt.hash(data, Number(config.salt_round));
}

export const decodeDataByBcrypt = async(hashData: string, plianData: string) => {
    return await bcrypt.compare(plianData, hashData);
}