import { fillphone } from "../helpers/helper.fillphone.js";
import { Response } from "../helpers/helper.message.js"
import { comparePWD, hashPWD } from "../helpers/helper.password.js";
import { Users } from "../models/model.users.js";

export const UsersController = {

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
                password: pwd
            })
            .then(user => {
                if(user instanceof Users) return Response(res, 200, user);
                else return Response(res, 400, {})
            })
            .catch(err => {
                return Response(res, 500, err);
            })
        } catch (error) {
            return Response(res, 500, error);
        }
    },
    validateaccount: async (req, res, next) => {
        try {
            
        } catch (error) {
            
        }
    },
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
                        if(d) return Response(res, 200, user);
                        else return Response(res, 203, {});
                    })
                }else return Response(res, 203, {});
            })
            .catch(err => {
                return Response(res, 500, err);
            })
        } catch (error) {
            return Response(res, 500, error);
        }
    },
    sendsos: async (req, res, next) => {

    }
}