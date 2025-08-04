const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
require ("dotenv").config();
const jwt = require ('jsonwebtoken');


const createUsers = async (req, res) => {
    console.log(req.body);

    console.log(req.files?.length? req.files[0].path : null)
    
    try {
        const { username, email, password } = req.body;
        if(!username || !email  || !password){
            return res.jos({ success:false, message:"Please enter all the fields !!"})
        }
        const image=req.files?.length? req.files[0].path : null

        const userExist = await User.findOne({where:{username:username}});
        if(userExist){
            res.jos({message:"User already exist use different Username"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password,salt)
        const newuser = await User.create({ username: username,email, password:newpassword,image});
        res.status(201).json({ success: true, message: 'user created!', newuser});
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


const getAllUsers = async (req, res) =>{
    console.log(req.headers.authorization)
    try{
        const users = await User.findAll({attributes:{exclude:['password','id']}});
        res.json({sucess: true,users:users});
    }catch (error){
        res.status(500).json({ error:"Error fetching users"});
    }
};


const findUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id },attributes: { exclude: ['password'] }});
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
};


const updateUsers = async (req, res) =>{
    const userID = req.user.id;
    try{
        const userExit =await User.findByPk(userID);
        if (userExit){
            console.log("user exit")
            const{username, email,password}= req.body;

            const image = req.files?.length? req.files[0].path : userExit.image;

            let newpassword = userExist.password;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                newpassword = await bcrypt.hash(password, salt);
            }

            const updateUsers = await User.update(
                {username,password,email,image},
                {where:{id: userID}});
            res.status(201).json({
                sucess :true,
                message:"User updated !!!",updateUsers
            });
        }
        else {
            res.json({message: "User does not exist"})
        }
    }catch (error){
        res.status(400).json({ error:error});
    }
};


const deleteUsers = async (req, res) => {
    const userId = req.params.id;
    try {
        const userExist = await User.findByPk(userId);
        if (userExist) {
            const deleteUser = await User.destroy({ where: { id: userId } });
            res.json({
                success: true,
                message: "User deleted", deleteUser
            });
        } else {
            res.json({ success: false, message: "user not found" });
        }
    } catch (error) {
        res.json({ error: error});
}
};


const loginUsers = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Sorry! Password does not match'});
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, role:user.role },
            process.env.JWT_TOKEN,
            { expiresIn:'24h'}
        );

        return res.status(200).json({
            success: true, message: 'Login successful', token, user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    createUsers,updateUsers,deleteUsers,getAllUsers,findUsers,loginUsers
};
