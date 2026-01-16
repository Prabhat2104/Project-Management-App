import Joi from "joi";


const userValidation = (req, res, next) => {
    const {name, email, password} = req.body;

    const schema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30),

    email: Joi.string()
    .email()
    .required(),

    password: Joi.string()
    .min(6)
    .required()
    })

    const {error, value} = schema.validate({name, email, password});

    if(error){
        return res.status(400).json({success: false, message: error.details[0].message})
    }

    req.value = value;
    next();
}

export {userValidation}