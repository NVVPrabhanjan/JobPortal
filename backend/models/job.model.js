import { application } from "express";
import mongoose from "mongoose";
import { type } from "os";

const jobSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    descrption :{
        type:String,
        required:true
    },
    requirements :{
        type:String
    },
    salary :{
        type:String,
        required:true
    },
    location :{
        type:String,
        required:true
    },
    location :{
        type:String,
        required:true
    },
    jobType :{
        type:String,
        required:true
    },
    position :{
        type:String,
        required:true
    },
    company :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    createdBy :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    application :[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
        required:true
    }
]
});
export const Job = mongoose.model("Job", jobSchema);