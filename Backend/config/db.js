import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({path:"../.env"});

const connectDb=async()=>{
   const uri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGODB_URL;
   if(!uri){
      console.error('Database connection failed: no MONGO_URI (or MONGODB_URI) found in environment');
      return;
   }
   if(!(uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))){
      console.error('Database connection failed: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"');
      console.error('Current value (redacted):', uri.replace(/(:).*(@)/, ':*****$2'));
      return;
   }

   try{
      const options = {
         serverSelectionTimeoutMS: 30000,
      };

      await mongoose.connect(uri, options);
      console.log("Database connected successfully");
   }catch(error){
      console.error("Database connection failed:", error.message);
      console.error(error);
   }

}

export default connectDb;