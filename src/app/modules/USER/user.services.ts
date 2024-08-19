import Query_Builder from "../../class/QueryBuilder";
import { User_Type } from "./user.interface";
import { User_Model } from "./user.model";



const Create_User_Service = async (data: User_Type) => {
    const result = await User_Model.create(data);
    return { result };
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