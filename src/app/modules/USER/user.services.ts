import Query_Builder from "../../class/QueryBuilder";
import config from "../../config";
import { Create_JWT_Token } from "../../utils/jwt";
import { User_Type } from "./user.interface";
import { User_Model } from "./user.model";
import jwt from 'jsonwebtoken';



const Create_User_Service = async (data: User_Type) => {
    const result = await User_Model.create(data);

    const accessToken = Create_JWT_Token({
        data: {
            email: data.email,
            role: data.role
        },
        secret: config.acc_token_secret as string,
        exp: config.access_token_exp as string
    })
    const refreshToken = Create_JWT_Token({
        data: {
            email: data.email,
            role: data.role
        },
        secret: config.ref_token_secret as string,
        exp: config.refresh_token_exp as string
    })

    return { result, accessToken, refreshToken }

}
const Get_All_User_Service = async (query: Record<string, unknown>) => {

    const partialTags = ['name.f_name', 'name.m_name', 'name.l_name', 'email', 'contact.phone', 'contact.address'];
    const userQueryInstance = new Query_Builder(User_Model.find(), query)
        .searchQuery(partialTags)
        .fieldQuery()
        .filterQuery()
        .sortQuery()
        .pageQuery()

    const result = await userQueryInstance.modelQuery;
    const meta = await userQueryInstance.countTotalMeta();

    return { result, meta };
}



export const User_Services = {
    Create_User_Service,
    Get_All_User_Service
}