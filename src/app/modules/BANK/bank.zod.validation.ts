
import { Types } from 'mongoose';
import { z } from 'zod';




export const Zod_Bank_Type = z.object({
    body: z.object({
        userId: z.string(),
        blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        weight: z.string()
    })
})