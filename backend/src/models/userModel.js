import mongoose from "mongoose";
import * as bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    }
})

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model("User",userSchema);

export default User;