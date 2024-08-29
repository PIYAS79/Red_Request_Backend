import { JwtPayload } from "jsonwebtoken"
import { Bank_Type } from "./bank.interface"
import { User_Model } from "../USER/user.model"
import Final_App_Error from "../../class/FinalApp_Error";
import httpStatus from "http-status";
import { Bank_Model } from "./bank.model";
import Query_Builder from "../../class/QueryBuilder";




// create a donate 
const Create_A_Donate_Service = async (data: Bank_Type, user: JwtPayload) => {

    // check the user id is exist into the DB or not 
    const userById = await User_Model.findById(data.userId);
    if (!userById) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "User is not found into the DB *");
    }
    // check the getted user id and token user id is same or not
    if (user.email !== userById.email) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Token is not match with your Donated Data Reference *");
    }
    // cheick the user blood group and getted blood group is same or not 
    if (userById.blood_group !== data.blood_group) {
        throw new Final_App_Error(httpStatus.NOT_ACCEPTABLE, "User blood group and sended blood group is not match *")
    }
    // set the info into the DB
    const result = await Bank_Model.create(data)
    return result
}
// Get all bank info service 
const Get_All_Bank_Data_Service = async (query: Record<string, unknown>) => {

    const partialTags = ['blood_group', 'weight']

    const bankInstance = new Query_Builder(Bank_Model.find().populate('userId'), query)
        .searchQuery(partialTags)
        .fieldQuery()
        .filterQuery()
        .sortQuery()
        .pageQuery()



    const result = await bankInstance.modelQuery;
    const meta = await bankInstance.countTotalMeta();
    return { result, meta };
}
// Get all bank info service 
const Get_A_Bank_Data_Service = async (did:string) => {

    // cheick if the donate id is exist or not 
    const donateData = await Bank_Model.findById(did).populate('userId');
    if(!donateData){
        throw new Final_App_Error(httpStatus.NOT_FOUND,"Donate Information is not found *");
    }
    
    return donateData
}




export const Bank_Services = {
    Create_A_Donate_Service,
    Get_All_Bank_Data_Service,
    Get_A_Bank_Data_Service
}