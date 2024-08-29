import { Schema, model } from "mongoose";
import { Bank_Type } from "./bank.interface";




const Bank_Schema = new Schema<Bank_Type>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User Id is a required field *"],
        ref: 'User'
    },
    blood_group: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not assignable *'
        },
        required: [true, "Blood Group is required field *"]
    },
    weight: {
        type: String,
        required: [true, "Weight is a required field *"]
    }
})



export const Bank_Model = model<Bank_Type>('Bank', Bank_Schema);
