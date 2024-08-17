
import mongoose from 'mongoose'
import app from './App'
import config from './config';


function main(){
    mongoose.connect(config.db_url as string);

    app.listen(config.port,()=>{
        console.log(`Server is running on http://localhost:${config.port}`);
    })
}

main();