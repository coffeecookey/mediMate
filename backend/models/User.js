import mongoose from 'mongoose';

const schema=mongoose.Schema;
const userSchema= new schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
})

export const userModel = mongoose.model('users', userSchema);
