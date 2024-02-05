import Joi from "joi";

export const SignUpValidation = async (req, res, next) => {
    const SignInSchema = Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org', "edu"] } }).required(),
        Password: Joi.string().required(),
        UserName: Joi.string().min(2).required(),
        age: Joi.number().integer().min(5).required(),
        gender: Joi.string().valid("male", "female").required(),
        Phone: Joi.string().max(12).required(),
    }).required();
    const Validate = SignInSchema.validate(req.body);
    if (Validate.error) {
        return res.json({ Validate, Message: "Complete all inputs or check them please" });
    }
    next();
}

export const SignInValidation = async (req, res, next) => {
    const SignInValidation = Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com', 'net', 'org', "edu"] } }).required(),
        Password: Joi.string().required()
    }).required();
    const Validate = SignInValidation.validate(req.body);
    if (Validate.error) {
        return res.json({ Validate, Message: "Wrong Password or wrong email" })
    }
    next();
};

export const OrderVaildation = async (req, res, next) => {
    const OrderVaildation = Joi.object({
        Order: Joi.string().required(),
        Location: Joi.string().required()
    }).required();

    const Validate = OrderVaildation.validate(req.body);
    if (Validate.error) {
        return res.json({ Validate, Message: "Check order name please" })
    }
    next();
}

export const TokenValidation = async (req, res, next) => {
    const TokenValidation = Joi.object({
        token: Joi.string().required(),
    }).required()
    const Validate = TokenValidation.validate(req.params);
    if (Validate.error) {
        return res.json({ Validate, Message: "Check the token please" });
    }
    next();
}