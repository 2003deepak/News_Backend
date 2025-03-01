const userModel = require("../../model/user");
const bcrypt = require("bcrypt");


const register = async(req,res) =>{

    const {firstName,lastName,username,password,email,preferences,location,prefferedLanguage} = req.body ; 

    try{
    
        let userExist = await userModel.findOne({email : email});

        if(userExist){
            return res.status(400).json({ status: 'fail', message: 'User already exists' });

        }else{

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, async (err, hash)=> {
        
                    let user = await userModel.create({
                        firstName:firstName,
                        lastName:lastName,
                        username:username,
                        password : hash,
                        email:email,
                        preferences : preferences,
                        prefferedLanguage : prefferedLanguage || "English",
                        location:location
                        
                    })
                    
                    return res.status(201).json({ status: 'success', message: 'User registered successfully' });
                });
            });
        }


    }catch(err){
        return res.status(500).json({ status: 'fail' , message: 'Internal server error'+err });
    }

}

module.exports = register; 