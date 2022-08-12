import dotenv from 'dotenv';
import { Response } from '../helpers/helper.message.js';
import { Agents } from '../models/nodel.agents.js';
import { Users } from '../models/model.users.js';
import { comparePWD, hashPWD } from '../helpers/helper.password.js';
import { fillphone } from '../helpers/helper.fillphone.js';
import { Expo } from 'expo-server-sdk';
import { Op } from "sequelize";
import { SOS } from '../models/model.sos.js';
import { Customersms } from '../models/model.customizedsms.js';
import pkg from 'sequelize';

dotenv.config()

export const AgentsControllers = {
    
    groupchats: async (req, res, next) => {
        const { idagent, phone } = req.params
        if(!idagent) return Response(res, 401, "This request must have at least !idagent");
        console.log(" IdAgent => ", idagent);
        Users.hasOne(Customersms, { foreignKey: "from" });
        Customersms.belongsTo(Users, { foreignKey: "from" });

        try {
            await Customersms.findAll({
                where: {
                    to: parseInt(idagent)
                },
                group: ["from"],
                include: [
                    {
                        model: Users,
                        required: true
                    }
                ]
                // attibutes: [
                //     "from",
                //     "fill",
                //     "from_token",
                //     "to_token",
                //     "createdon",
                //     [pkg.fn('COUNT', pkg.col('to')), 'totalmessage']
                // ]
            })
            .then(sms => {
                // console.log(" Group SMS => ", sms);
                return Response(res, 200, sms)
            })
            .catch(err => {
                console.log(" Error =>  ", err);
                return Response(res, 500, err)
            })
        } catch (error) {
            console.log(" Une erreur vient de se produire ", error);
            return Response(res, 500, error)
        }
    },

    sendmessage: async (req, res, next) => {
        const { to, hospitalref, content, from, from_token, to_token, fil, fullnamefrom } = req.body;
        try {
            if(!hospitalref || !to || !from || !from) return Response(res, 401, "This request must have at least !hospitalref || !to || !from || !from")
            await Users.findAll({
                where: {
                    id: parseInt(from),
                    status: 1,
                    hospitalref: parseInt(hospitalref)
                },
                attributes: ["pushtoken", "phone"]
            })
            .then(ags => {
                if(ags){
                    const tokens = [];
                    ags.forEach(element => {
                        tokens.push(element['pushtoken'])
                    });

                    broadCastNotification({
                        tokens,
                        title: fullnamefrom,
                        subtitle: "From from SOS Afia",
                        body: content,
                        data: req.body,
                        cs: 2 // this means is chat
                    }, (er, dn) => {
                     
                    });

                    Customersms.create({
                        from,
                        to_token: 
                            to_token 
                            ? to_token 
                            : tokens['length'] 
                            ? tokens[0] 
                            : process.env.APPESCAPESTRING,
                        fill: fil ? fil : `fil-${from}-${hospitalref}`,
                        content,
                        from_token,
                        to,
                        pos: 2 // this means that is agent
                    })
                    .then(sms => {
                        return Response(res, 200, sms)
                    })
                    .catch(err => {
                        return Response(res, 500, err)
                    })
                }else{
                    return Response(res, 400, ags);
                }
            })
            .catch(err => {
                return Response(res, 500, err);
            });
        } catch (error) {
            return Response(res, 500, error);
        }
    },

    listmessage: async (req, res, next) => {
        const { fill } = req.params;
        if(!fill) return Response(res, 401, "This request mus have at least !fill");

        try {
            await Customersms.findAll({
                where: {
                    fill
                }
            })
            .then(listes => {
                return Response(res, 200, listes)
            })
            .catch(error => {
                return Response(res, 500, error)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    // liste des agents
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
        console.log(req.body);
        if(!email || !password) return Response(res, 401, "This request mus have at least ! !phone || !password");
        try {
            await Agents.findOne({
                where: {
                    [Op.or]: [
                        { phone: fillphone(email) },
                        { email: email.toString().toLowerCase() }
                    ]
                }
            })
            .then(user => {
                console.log(user);
                if(user instanceof Agents){
                    comparePWD({hashedtext: user.password, oldplaintext: password}, (e, d) => {
                        if(d) return Response(res, 200, user);
                        else return Response(res, 203, {});
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
    // liste des SOS cases
    loadsoscase: async (req, res, next) => {
        const { hospitalref } = req.params;
        try {
            await SOS.findAll({
                where: {
                    status: 1,
                    hospitalref
                }
            })
            .then(s => {
                return Response(res, 200, s)
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // chargement de l'utilisateur
    loadme: async (req, res, next) => {
        const { phone, pushtoken } = req.body;
        if(!phone || !pushtoken) return Response(res, 401, "This request mus have at least !phone || !pushtoke");

        try {
            await Agents.findOne({
                where: {
                    status: 1,
                    phone: fillphone(phone)
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
                console.log(er);
                return Response(res, 500, er)
            })
        } catch (error) {
            console.log(error);
            return Response(res, 500, error)
        }
    }
}