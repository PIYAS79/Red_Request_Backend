import { Schema, model } from "mongoose";
import { Contact_Type, Name_Type, User_Type } from "./user.interface";
import { encodeDatabyBcrypt } from "../../utils/bcrypt";


const Name_Schema = new Schema<Name_Type>({
    f_name: {
        type: String,
        required: [true, "First Name is required *"]
    },
    m_name: {
        type: String,
    },
    l_name: {
        type: String,
        required: [true, "Last Name is required *"]
    },
})

const Contact_Schema = new Schema<Contact_Type>({
    phone: {
        type: String,
        required: [true, "Phone Number is required *"]
    },
    address: {
        type: String,
    }
})


const User_Schema = new Schema<User_Type>({
    name: Name_Schema,
    blood_group: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not assignable *'
        },
        required: [true, "Blood Grounp is required *"]
    },
    email: {
        type: String,
        required: [true, "Email is required *"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required *"],
        select: 0
    },
    contact: Contact_Schema,
    profile_image: {
        type: String,
        required: [true, "Profile Image is Required *"]
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Block'],
            message: '{VALUE} is not assaignable *'
        },
        required: [true, "Status is required *"],
    },
    role: {
        type: String,
        enum: {
            values: ['Donor', "Requester", "Admin"],
            message: '{VALUE} is not assignable *'
        },
        required: [true, "Blood Grounp is required *"]
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})






User_Schema.pre('save', async function (next) {
    const newUser = this;
    newUser.password = await encodeDatabyBcrypt(this.password);
    next();
})
User_Schema.post('save', async function (doc, next) {
    doc.password = '';
    next();
})


export const User_Model = model<User_Type>('User', User_Schema);

