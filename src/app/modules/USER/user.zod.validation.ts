import { z } from 'zod';

// Name_Type
export const Zod_NameSchema = z.object({
    f_name: z.string(),
    m_name: z.string().optional(),
    l_name: z.string(),
});

// Contact_Type
export const Zod_ContactSchema = z.object({
    phone: z.string(),
    address: z.string().optional(),
});

// User_Type
const Zod_UserSchema = z.object({
    body: z.object({
        name: Zod_NameSchema,
        blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        email: z.string().email(),
        password: z.string(),
        contact: Zod_ContactSchema,
        profile_image: z.string(),
        status: z.enum(['Active', 'Block']),
        role: z.enum(['Donor', 'Requester', 'Admin']),
    })
});


export { Zod_UserSchema };
