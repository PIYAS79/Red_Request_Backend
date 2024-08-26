



import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });


export default {
    db_url: process.env.DB_URL,
    port: process.env.PORT,
    environment: process.env.ENVIRONMENT,
    salt_round: process.env.SALT_ROUND,
    access_token_exp: process.env.ACC_TOKEN_EXP,
    refresh_token_exp: process.env.REF_TOKEN_EXP,
    token_secret: process.env.ACC_SECRET,
    central_email:process.env.CENTER_EMAIL,
    mail_secret:process.env.MAIL_SECRET,
    frontend_url:process.env.FRONTEND_URL
}