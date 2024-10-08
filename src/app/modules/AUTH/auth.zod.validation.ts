import { z } from 'zod'


export const Zod_Login_Data_Type = z.object({
    body: z.object({
        email: z.string(),
        password: z.string()
    })
})

export const Zod_Change_Pass_Type = z.object({
    body: z.object({
        newPass: z.string(),
        oldPass: z.string()
    })
})

export const Zod_Forget_Pass_Type = z.object({
    body: z.object({
        email: z.string()
    })
})

export const Zod_Reset_Password = z.object({
    body: z.object({
        email: z.string(),
        newPassword: z.string()
    })
})

export const Zod_Refresh_Token = z.object({
    cookies: z.object({
        refreshToken: z.string()
    })
})