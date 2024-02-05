import { Router } from "express";
import { User } from "../../DB/models/UsersModel.js";
import { OrderVaildation, SignInValidation, SignUpValidation, TokenValidation } from "../Validation/Validations.js";
import { AllOrders, CheckLogin, CheckToken, Confirmation, GetUser, MakeOrder, SignIn, SignUp, Sign_Out } from "./UserController.js";
import { SendMail } from "../../utils/SendMail.js";
import { Orders } from "../../DB/models/Order.js";
import jwt from 'jsonwebtoken'
import { BlackList } from "../../DB/models/BlackList.js";


export const routing1 = Router();

routing1.post('/AddUser', SignUpValidation, SignUp);

routing1.get('/Confirmation/:token', Confirmation)

routing1.post("/SignIn", SignInValidation, SignIn);

routing1.post('/Order/:token', CheckToken, CheckLogin, OrderVaildation, MakeOrder);

routing1.patch("/SignOut/:token", TokenValidation, Sign_Out);

routing1.get("/CallOrders", AllOrders);

routing1.get("/UserDate/:Token", GetUser)