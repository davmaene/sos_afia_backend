import dotenv from 'dotenv';
import { Response } from '../helpers/helper.message.js';
import { Agents } from '../models/nodel.agents.js';
import { Users } from '../models/model.users.js';
import { comparePWD, hashPWD } from '../helpers/helper.password';
import { fillphone } from '../helpers/helper.fillphone';

dotenv.config()

export const AgentsControllers = {
    // function axecuted on SIGNUP
    signup: async (req, res, next) => {
        const { fsname, lsname, email, phone,  password, hospitalref } = req.body;
        if(!fsname || !lsname || !phone || !email || !password || !hospitalref) 
        return Response(res, 401, "This request mus have at least : !fsname || !lsname || !phone || !email || !password || !hospitalref");
        
        try {
            const pwd = await hashPWD(password);
            await Users.create({
                fsname: fsname.toLowerCase(),
                lsname: lsname.toLowerCase(),
                nickname: nickname ? nickname : process.env.APPESCAPESTRING,
                phone: fillphone(phone),
                email: email.toLowerCase(),
                password: pwd,
                hospitalref: hospitalref ? hospitalref : ""
            })
            .then(user => {
                if(user instanceof Users) return Response(res, 200, user);
                else return Response(res, 400, {});
            })
            .catch(err => {
                return Response(res, 503, err);
            })
        } catch (error) {
            return Response(res, 500, error);
        }
    },
    // function executed on SIGNIN
    signin: async (req, res, next) => {
        const { email, password } = req.body;
        if(!email || !password) return Response(res, 401, "This request mus have at least ! !phone || !password");
        try {
            await Agents.findOne({
                where: {
                    email: email.toLowerCase(),
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
                // console.log("In model => ", err);
                return Response(res, 500, err);
            })
        } catch (error) {
            // console.log("In catch => ", error);
            return Response(res, 500, error);
        }
    },
    loadme: async (req, res, next) => {
        try {
            await Agents.findOne({
                where: {
                    status: 1,
                    email: email.toLowerCase()
                }
            })
            .then(ag => {

            })
            .catch(er => {
                return Response(res, 500, er)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}