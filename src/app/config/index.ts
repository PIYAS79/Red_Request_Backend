



import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')});


export default {
    db_url:process.env.DB_URL,
    port:process.env.PORT,
    environment:process.env.ENVIRONMENT,
    salt_round:process.env.SALT_ROUND
}