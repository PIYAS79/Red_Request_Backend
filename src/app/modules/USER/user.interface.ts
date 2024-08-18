
export type Name_Type = {
    f_name: string,
    m_name?: string,
    l_name: string
}

export type Contact_Type = {
    phone:string,
    address?:string,
}

export type User_Type = {
    name:Name_Type,
    blood_group: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    email:string,
    password:string,
    contact:Contact_Type,
    profile_image:string,
    status: 'Active' | 'Block',
    role: 'Donor' | "Requester" | "Admin"
}