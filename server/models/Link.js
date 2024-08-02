import { Schema , model} from "mongoose";


const linkSchema = new Schema({
    target:{
        type: String,
        require:true
    },
    slug:{
        type : String,
        require :true,
        unique:true
    },
    title:{
        type:String,
        require:true,
    },
    views:{
        type:Number,
        require:true,
        default:0
        }

   },{
        timestamps:true
    });


const Link = model ("Link", linkSchema);
export default Link
