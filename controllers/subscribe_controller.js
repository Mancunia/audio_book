const request = require('request');

const {subscription,subscribing} = require('../models/subscriptionModel');
const User = require('../models/userModel');


const {initializePayment, verifyPayment} = require('../util/paystack')(request);
const {decode_JWT,milliToggle,createToken} = require('../util/utils');

const exempt =' -__v -_id -active -moment';

//aux functions

//route controllers 
const getPage = async(req,res)=>{
    try{
        res.render('subscribe');
    }
    catch(error){
        res.status(403).json({error});
    }
}


//get all active subscriptions
const getSubscriptions = async(req,res)=>{
    try{
        if(!req.body){
            throw 'no body'
        }
        const reqBody={};

        if(req.body.active){//if there was an active 

            switch (req.body.active) {//check param

                case "all"://all subscriptions
                    delete reqBody.active;
                    break;

                case "true"://just active subscription type

                        reqBody.active=true;
                        reqBody.visible=true;
                break;

                case "false"://just inactive subscription type
                        reqBody.active=false;
                break;
            
                default:
                    reqBody.active=false;
                break;
            }
            
            
        }
        else{
            reqBody.active=true;
            reqBody.visible=true;
        }
        

        console.log(reqBody);

        const subs= await subscription.find(reqBody,exempt);
        if(!subs){
            throw 'Something unsual happened';
        }
        // continue after fetch for subs
        // console.log(subs);

        subs.forEach(sub=>{
            let newDuration = milliToggle({time:sub.duration,return:'toDays'});
            sub.duration = newDuration;
        });
        

        res.json({subs});


    }
    catch(error){
        // console.log(error);
        res.status(403).json({error});
    }
}

//create a subscription
const postSubscription =async(req,res)=>{
    try{
        if(!req.body){
            throw 'Body is empty';
        }
        const body = req.body;
       
        const times = body.duration;
        const duration = milliToggle({time:times,return:'toMilliseconds'});

        const newSubscription = {
            name:body.name,
            amount:body.amount,
            accent:body.accent,
            users:body.users,
            autorenew:body.auto,
            active:body.active,
            duration
        }

        const createSubscription = await subscription.create(newSubscription);
        if(!createSubscription){
            throw 'Something happened while attempting add new subscription';
        }

        res.json({createSubscription});//return msg
    }
    catch(error){
        // console.log(error);
        res.status(403).json({error});
    }
}



const Subscribe = async (req,res)=>{
    try{
        console.log('just now ');
        let user;
        if(req.cookies.jwt){
            user=(await decode_JWT(req.cookies.jwt))._id
        }
        else if(req.query.mail){
            let key=req.query.mail;
            const thisUser = await User.info({type:'mail',key});
            if(!thisUser){
                throw 'Mail was not found as well as user';
            }
            user = thisUser.id;
        }
        else{
            throw 'User Missing';
        }

         

        const subName = req.query.subscriptionsKey;
        if(!subName){
            throw 'No Subscription key was found';
        }

        // something was passed;
        const thisSub = await subscription.details(subName);
        if(!thisSub){
            throw 'Something else happened';
        }
        // console.log(user);
        const thisUser = await User.info({type:'id',key:user});

        // console.log(thisSub);
        //subscription was found
        const Amnt = (thisSub.amount)*100;
       
        let realAmnt="";
        if(Amnt==0){
            realAmnt="0";
        }
        if(Amnt<0){
            throw 'This is not expected'
        }
        if(Amnt>0){
            realAmnt = Amnt.toString();
        }
        //  console.log(realAmnt);
        const userEnc = await createToken(user);

        const sending = {
            amount:realAmnt,
            email:thisUser.email,
            metadata:{
            user_id:userEnc,
            subscription:subName
        }

        }

        initializePayment(sending, (error, body)=>{
            if(error){
                //handle errors
                console.log(error);
                return;
           }
           response = JSON.parse(body);
           res.redirect(response.data.authorization_url)
        });



    }
    catch(error){
        console.log(error);
        // res.status(403).json({error});
        res.render('instruction',{error});
    }

}



const afterPayment =async(req,res) => {
    try{
        const ref = req.query.reference;
        // if(!req.cookies.jwt){
        //     throw 'User Missing';
        // }
        // const user = await decode_JWT(req.cookies.jwt);

    
    verifyPayment(ref, async (error,body)=>{
        if(error){
            //handle errors appropriately
           throw 'Error whiles coming back';
        }
        response = JSON.parse(body);
       
    
        // what to after payment is successful or not...........................................

       if(response.status){//a successful payment
        const data = response.data.metadata
        const metaUser =(await decode_JWT(data.user_id))._id;
        // console.log(user._id==metaUser._id);
        const thisUser = await User.info({type:'id',key:metaUser});
        if(!thisUser){//check user who payed and current user
            throw `User identity does not match any User`
        }

        // check for reference
        const thisRef = await subscribing.findOne({ref});
        // if(!thisRef){
        //     console.log(thisRef);
        //     throw 'Error fetching data'
        // }
        if(thisRef){
            throw 'Reference exists already';
        }
        // console.log(data);

        const subInfo = await subscription.details(data.subscription);// get subscription information
        // console.log(subInfo);

        // create new subscription_instance
        let newSub= await subscribing.openSubscribe({
            ref:ref,
            user:metaUser,
            subscription:subInfo.id
        });

        if(!newSub){//error while creating a new subscription instance
            throw `Error while subscribing`;
        }

        // console.log(newSub);
        //active subscription for user
        let updateUser= await User.subscription({
            user:metaUser,
            subscription:newSub.toString()
        },subscription,subscribing);
        if(!updateUser){
            throw 'Could not update user'
        }

        // console.log(updateUser);


let message =`Subscription successfully activated`
         res.render('congrats',{username:updateUser.username,message:message,});//this will go after testing
       }
       else{
           throw 'Error While Processing Payment';
       }


    });


    }
    catch(error){
    res.render('instruction',{error});
    }
    
}

module.exports={
getPage,
getSubscriptions,
postSubscription,
Subscribe,
afterPayment

}