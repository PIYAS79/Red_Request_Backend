import { Date, Model } from "mongoose"

export type Name_Type = {
    f_name: string,
    m_name?: string,
    l_name: string
}

export type Contact_Type = {
    phone: string,
    address?: string,
}

export type User_Type = {
    name: Name_Type,
    blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    email: string,
    password: string,
    contact: Contact_Type,
    profile_image: string,
    status: 'Active' | 'Block',
    role: 'Donor' | "Requester" | "Admin",
    passwordChangeAt?: Date
}

// custom static method
export interface isUserExistByEmail extends Model<User_Type> {
    isUserExist(email: string): Promise<User_Type>,
    is_JWT_Token_Exp_Check(PassChangeAt: Date, jwtIssued: number): boolean,
} 