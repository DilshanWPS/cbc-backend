import mongoose from "mongoose";

const productSchema=new mongoose.Schema(
    {
        productId:{
            type:String,
            required:true,
            unique:true
        },

        name:{
            type:String,
            required:true
        },

        altNames:{
            type:[String],
            default:[]
        },

        price:{
            type:Number,
            required:true
        },

        labledPrice:{
            type:Number,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        images:{
            type:[String],
            required:true,
            default:["https://png.pngtree.com/png-clipart/20250106/original/pngtree-cosmetics-beauty-products-mockup-png-image_19401775.png"]
        },

        stock:{
            type:Number,
            required:true
        }

    }
);

const Product=mongoose.model("products",productSchema);

export default Product;

