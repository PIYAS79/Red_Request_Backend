import { NextFunction, Request, Response } from "express"
import { Error_Source_Type } from "../global/Error.interface"
import httpStatus from "http-status"
import config from "../config"
import { ZodError, ZodIssue } from "zod"
import mongoose, { MongooseError } from "mongoose"


const Global_Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {


    let Error_Title: string = "There is an server side error *"
    let Error_Source: Error_Source_Type = [
        {
            path: '',
            message: "There is an server side error *"
        }
    ]
    let Error_Status_Code = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;


    const Zod_Validation_Error = (err: ZodError) => {
        const err_title: string = "Validation Error - Zod *";
        const err_source: Error_Source_Type = err.issues.map((one: ZodIssue) => ({
            path: one.path[one.path.length - 1],
            message: one.message
        }))
        return { err_title, err_source };
    }

    const mongooseValidation_Error = (err: mongoose.Error.ValidationError) => {
        const err_title: string = "Validation Error - Zod *";
        const err_source: Error_Source_Type = Object.values(err.errors).map((one: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
            path: one.path,
            message: one.message
        }))
        return { err_title, err_source };
    }


    if (err instanceof ZodError) {
        const gettedData = Zod_Validation_Error(err);
        Error_Title = gettedData.err_title;
        Error_Source = gettedData.err_source;
    } else if (err.name === 'ValidationError') {
        const gettedData = mongooseValidation_Error(err);
        Error_Title = gettedData.err_title;
        Error_Source = gettedData.err_source;
    }








    res.status(Error_Status_Code).json({
        success: false,
        Error_Title,
        Error_Source,
        stack: config.environment === "DEVELOPMENT" ? err.stack : {},
        error: config.environment === "DEVELOPMENT" ? err : {}
    })
}

export default Global_Error_Handler;