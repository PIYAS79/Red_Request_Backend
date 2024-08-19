
import mongoose from 'mongoose'
import app from './App'
import config from './config';
import { Server } from 'http';


let server: Server

function main() {
    mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
        console.log(`Server is running on http://localhost:${config.port}`);
    })
}

main();

process.on('unhandledRejection', () => {
    console.log(`Unhanlde Rejection found 😈`);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('uncaughtException', () => {
    console.log(`UncaughtException found 😈`);
    process.exit(1);
})

