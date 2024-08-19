import { User_Type } from "./user.interface";
import { User_Model } from "./user.model";



const Create_User_Service = async (data: User_Type) => {
    const result = await User_Model.create(data);
    return { result };
}




export const User_Services = {
    Create_User_Service,
}