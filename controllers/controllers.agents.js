import dotenv from 'dotenv';
import { Response } from '../helpers/helper.message.js';
import { Agents } from '../models/nodel.agents.js';
import { Users } from '../models/model.users.js';
import { comparePWD, hashPWD } from '../helpers/helper.password.js';
import { fillphone } from '../helpers/helper.fillphone.js';
import { Expo } from 'expo-server-sdk';
import { Op } from "sequelize";

dotenv.config()

export const AgentsControllers = {
    list: async (req, res, next) => {
        try {
            await Agents.findAll({
                where: {
                    status: 1
                }
            })
            .then(ags => {
                return Response(res, 200, ags)
            })
            .catch(err =>{
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // function axecuted on SIGNUP
    signup: async (req, res, next) => {
        const { fsname, lsname, email, phone,  password, hospitalref } = req.body;
        if(!fsname || !lsname || !phone || !email || !password || !hospitalref) 
        return Response(res, 401, "This request mus have at least : !fsname || !lsname || !phone || !email || !password || !hospitalref");
        
        try {
            const pwd = await hashPWD(password);
            await Agents.create({
                fsname: fsname.toLowerCase(),
                lsname: lsname.toLowerCase(),
                phone: fillphone(phone),
                email: email.toLowerCase(),
                password: pwd,
                hospitalref: hospitalref ? hospitalref : ""
            })
            .then(user => {
                if(user instanceof Agents) return Response(res, 200, user);
                else return Response(res, 400, {});
            })
            .catch(err => {
                // console.log(err);
                return Response(res, 503, err);
            })
        } catch (error) {
            // console.log(error);
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
                    [Op.or]: [
                        { email: email.toString().toLowerCase() },
                        { telephone: fillphone(email) }
                    ]
                    // email: email.toLowerCase(),
                    // status: 1
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
        const { email, pushtoken } = req.body;
        try {
            await Agents.findOne({
                where: {
                    status: 1,
                    email: email.toLowerCase()
                }
            })
            .then(ag => {
                if(ag instanceof Agents){
                    if(Expo.isExpoPushToken(ag.pushtoken)) return Response(res, 200, ag);
                    else{
                        ag.update({
                            pushtoken 
                        })
                        return Response(res, 200, ag)
                    }
                }else{
                    return Response(res, 400, ag )
                }
            })
            .catch(er => {
                return Response(res, 500, er)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}