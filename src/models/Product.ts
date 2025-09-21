import mongoose , { Schema , Document } from "mongoose";

export interface IPro extends Document {
  productName: string;
  productDesc: string;
  productPrice: number;
  productImageLink : string;
}

const ProductSchema: Schema = new Schema(
    {   
        productName: {
            type: String,
            required : true
        },
        productDesc : {
            type: String,
            required : true
        },
        productPrice : {
            type : Number,
            required : true
        },
        productImageLink : {
            type : String
        },
    },
    
    {timestamps : true}
    
);


export default mongoose.model<IPro>("Product",ProductSchema)

