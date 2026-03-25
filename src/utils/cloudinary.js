import {v2 as cloudinary} from "cloudinary";
import fs, { rmSync } from "fs";
import dotenv from "dotenv";

dotenv.config();rmSync

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath)=>{  
    try{
        if(!localFilePath){
            return null;
        }
        
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});

        // file has been uploaded successfully
        //unlink file and return response

        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(err){
        console.log("Cloudinary Error: ", err)
        // remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary};
