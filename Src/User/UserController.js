import { Orders } from "../../DB/models/Order.js";
import { User } from "../../DB/models/UsersModel.js";
import { ErrorCatch } from "../../utils/ErrorCatch.js";
import bcrypt from 'bcrypt';
import { SendMail, SendMail2 } from "../../utils/SendMail.js";
import jwt from 'jsonwebtoken'
import { BlackList } from "../../DB/models/BlackList.js";


export const SignUp = ErrorCatch(async (req, res, next) => {
    const { email, Password, UserName, age, gender, Phone } = req.body;
    const CheckUser = await User.findOne({ email });
    if (CheckUser) {
        return res.json({ Message: "User already exsit" })
    }
    if (!email || !Password) {
        return res.json({ Message: "Please add your Email or Password" });
    }
    let HashPassword = bcrypt.hashSync(Password, 8)
    const AddUser = await User.create({ email, Password: HashPassword, UserName, age, gender, Phone });
    if (!AddUser) {
        return res.json({ Message: "Can't add this inputs" })
    }
    const Token = jwt.sign({ email }, "Cheese");
    SendMail2({
        to: email,
        subject: "Confirmation",
        html: `<a href='http://localhost:4000/Confirmation/${Token}'>Click here for confirm your email</a>`
    })
    return res.json({ Message: "Done", AddUser });
})

export const Confirmation = ErrorCatch(async (req, res, next) => {
    const { token } = req.params;
    const EmailToken = jwt.verify(token, 'Cheese');
    const { email } = EmailToken;
    const Update = await User.findOneAndUpdate({ email }, { Confirmed: true }, { new: true });
    return res.json({ Message: "Confirmed", Update })
})

export const SignIn = ErrorCatch(async (req, res, next) => {
    const { email, Password } = req.body;
    const SignIn = await User.findOne({ email, Confirmed: true });
    const ComparePassword = bcrypt.compareSync(Password, SignIn.Password);
    if (!SignIn) {
        return res.json({ Message: 'User not found' });
    }
    if (!ComparePassword) {
        return res.json({ Message: "Wrong Password" });
    }
    const Login = await User.findOneAndUpdate({ email }, { status: true }, { new: true });
    const Token = jwt.sign({ email }, "Cheese")
    return res.json({ Message: "User found", Token })
})

export const CheckLogin = ErrorCatch(async (req, res, next) => {
    const { token } = req.params;
    const EmailToken = jwt.verify(token, "Cheese");
    const { email } = EmailToken;
    const CheckLogin = await User.findOne({ email, status: true });
    if (!CheckLogin) {
        return res.json({ Message: "You should Sign In first" });
    }
    req.email = email
    next();
})

export const MakeOrder = ErrorCatch(async (req, res, next) => {
    const { Order, Location } = req.body;
    const GetUser = await User.findOne({ email: req.email });

    const AddOrder = await Orders.create({ Order, Owner: GetUser._id, Location });
    if (!AddOrder) {
        return res.json({ Message: "Can't add this order" });
    }
    await SendMail({
        subject: "New Order",
        html: `<p>My order is ${Order} and that's my phone ${GetUser.Phone}</p>`
    })
    return res.json({ Message: "Sending Email", AddOrder });
})

export const AllOrders = ErrorCatch(async (req, res, next) => {
    const AllOrders = await Orders.find().populate("Owner");
    return res.json({ Message: "All Users", AllOrders });
})

export const Sign_Out = ErrorCatch(async (req, res, next) => {
    const { token } = req.params;
    const AddToBlackList = await BlackList.create({ token });
    const EmailToken = jwt.verify(token, 'Cheese');
    const { email } = EmailToken;
    const EditStatus = await User.findOneAndUpdate({ email }, { status: false });
    return res.json({ Message: "Sign out" });
})

export const CheckToken = ErrorCatch(async (req, res, next) => {
    const { token } = req.params;
    const BlackListCheck = await BlackList.findOne({ token });
    const EmailToken = jwt.verify(token, 'Cheese');
    const { email } = EmailToken;
    const UserCheck = await User.findOne({ email, status: true })
    if (BlackListCheck || !UserCheck) {
        return res.json({ Message: "Please You need to login again " });
    }
    next()
})

export const GetUser = ErrorCatch(async (req, res, next) => {
    const { Token } = req.params;
    const EmailToken = jwt.verify(Token, "Cheese");
    const { email } = EmailToken;
    const GetUser = await User.findOne({ email });
    return res.json({ Message: "User", GetUser })
})