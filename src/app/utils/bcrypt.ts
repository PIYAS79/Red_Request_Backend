import bcrypt from 'bcrypt';
import config from '../config';

export const encodeDatabyBcrypt = (data: string) => {
    return bcrypt.hash(data, Number(config.salt_round));
}

export const decodeDataByBcrypt = (hashData: string, plianData: string) => {
    return bcrypt.compare(plianData, hashData);
}