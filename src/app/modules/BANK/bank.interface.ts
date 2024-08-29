import { Types } from "mongoose"



export type Bank_Type = {
    userId: Types.ObjectId,
    blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    weight: string
}