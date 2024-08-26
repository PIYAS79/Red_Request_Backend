import jwt from 'jsonwebtoken';

type createJWT_Token_Type = {
    data: { email: string, role: string },
    secret: string,
    exp: string
}

export const Create_JWT_Token = (gettedData: createJWT_Token_Type) => {
    return jwt.sign(gettedData.data, (gettedData.secret as string), { expiresIn: gettedData.exp });
} 