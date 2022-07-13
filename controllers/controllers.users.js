import { fillphone } from "../helpers/helper.fillphone.js";
import { Response } from "../helpers/helper.message.js";
import { comparePWD, hashPWD } from "../helpers/helper.password.js";
import { randomLongNumber } from "../helpers/helper.random.js";
import { Users } from "../models/model.users.js";
import { sendMessage } from "../services/services.sendsms.js";

export const UsersController = {

    // function axecuted on SIGNUP
    signup: async (req, res, next) => {
        const { fsname, lsname, nickname, phone, gender, age, password, hospitalref } = req.body;
        if(!fsname || !lsname || !phone || !gender || !age || !password) 
        return Response(res, 401, "This request mus have at least !fsname || !lsname || !phone || !gender || !age || !password");
        
        try {
            const pwd = await hashPWD(password);
            await Users.create({
                fsname: fsname.toLowerCase(),
                lsname: lsname.toLowerCase(),
                nickname: nickname ? nickname : process.env.APPESCAPESTRING,
                phone: fillphone(phone),
                password: pwd,
                gender,
                age,
                hospitalref: hospitalref ? hospitalref : ""
            })
            .then(user => {
                if(user instanceof Users) return Response(res, 200, user);
                else return Response(res, 400, {})
            })
            .catch(err => {
                return Response(res, 503, err);
            })
        } catch (error) {
            return Response(res, 500, error);
        }
    },
    // function executed on resending code for activation account
    resendcodevalidation: async (req, res, next) => {
        const { phone, oldcode } = req.body;
        if(!phone) return Response(res, 401, "This request mus have at least !phonenumber ");
        try {
            const code = randomLongNumber({ length: 6 });
            sendMessage({
                phone: fillphone(phone),
                code: null,
                content: `Nous avons détecter que votre compte n'est pas encore activé voici votre code de validation #${code} `
            }, (e, d) => {});
            return Response(res, 200, { user : {}, code })  
        } catch (error) {
           return Response(res, 500, error);
        }
    },
    // function executed on VALIDATE ACCOUNT
    validateaccount: async (req, res, next) => {
        try {
            const { code, phone } = req.body;
            if(!phone) return Response(res, 401, "This request mus have at least || !phone ! ");
            await Users.findOne({
                where: {
                    phone: fillphone(phone),
                    status: 1
                }
            })
            .catch(us => {
                if(us instanceof Users){
                    us.update({
                        isactivated: 1
                    })
                    .then(U =>  Response(res, 200, us))
                    .catch(e => Response(res, 500, us))
                }else{
                    return Response(res, 402, req.body);
                }
            })
            .catch(er => {
                return Response(res, 500, req.body);
            })
        } catch (error) {
            return Response(res, 500, {});
        }
    },
    // function executed on SIGNIN
    signin: async (req, res, next) => {
        const { phone, password } = req.body;
        if(!phone || !password) return Response(res, 401, "This request mus have at least ! !phone || !password");
        try {
            await Users.findOne({
                where: {
                    phone: fillphone(phone),
                    status: 1
                }
            })
            .then(user => {
                if(user instanceof Users){
                    comparePWD({hashedtext: user.password, oldplaintext: password}, (e, d) => {
                        if(d){
                            if(user.isactivated === 1){
                                return Response(res, 200, user);
                            } else {
                                const code = randomLongNumber({ length: 6 });
                                sendMessage({
                                    phone: fillphone(phone),
                                    code: null,
                                    content: `Nous avons détecter que votre compte n'est pas encore activé voici votre code de validation #${code} `
                                }, (e, d) => {});
                                return Response(res, 402, { user, code });
                            }
                        }else return Response(res, 203, {});
                    })
                }else return Response(res, 203, {});
            })
            .catch(err => {
                console.log("In model => ", err);
                return Response(res, 500, err);
            })
        } catch (error) {
            console.log("In catch => ", error);
            return Response(res, 500, error);
        }
    },
    // function excecuted on send SOS Alarm 
    sendsos: async (req, res, next) => {
        const { latitude, longitude, hospitalref, phone, fsname, lsname } = req.body;
        if(!latitude || !longitude ||phone ||fsname ||lsname) return Response(res, 401, "This request mus have at least !latitude || !longitude ||phone ||fsname ||lsname" );
        try {
            return Response(res, 200, req.body)
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}