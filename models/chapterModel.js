const mongoose = require('mongoose');
const { ObjectId } = require('bson');

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title:{
        type:String,
        default:'A chapter without name'
    },
    description:{
        type:String
    },
    file:{
        type:String
    },
    mimetype:{
        type:String
    },
    book:{
        type:ObjectId,
        required:[true,'Missing Book']
    },
    moment:{
        type:Date,
        default:mongoose.now()
    }

},{
     timestamp:true
 });

 const chapter = mongoose.model('chapter',chapterSchema);


 module.exports=chapter;