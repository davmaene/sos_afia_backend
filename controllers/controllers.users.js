import { fillphone } from "../helpers/helper.fillphone.js";
import { Response } from "../helpers/helper.message.js";
import { comparePWD, hashPWD } from "../helpers/helper.password.js";
import { generateIdentifier, randomLongNumber } from "../helpers/helper.random.js";
import { SOS } from "../models/model.sos.js";
import { Users } from "../models/model.users.js";
import { sendMessage } from "../services/services.sendsms.js";
import dotenv from 'dotenv';
import { Agents } from "../models/nodel.agents.js";
import { broadCastNotification } from "../services/services.notifications.js";
import { Customersms } from "../models/model.customizedsms.js";
import { saveFile } from "../services/services.savefile.js";
import { Expo } from 'expo-server-sdk';

dotenv.config();

export const UsersController = {

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
                console.log(" Liste of message => ", listes);
                return Response(res, 200, listes)
            })
            .catch(err => {
                console.log(" Error on loading message => ", err)
                return Response(res, 500, err)
            })
        } catch (error) {
            console.log(" Error on loading message => ", error);
            return Response(res, 500, error)
        }
    },
    // function axecuted on SIGNUP
    signup: async (req, res, next) => {
        const { fsname, lsname, nickname, phone, gender, age, password, hospitalref } = req.body;
        if(!fsname || !lsname || !phone || !gender || !age || !password) 
        return Response(res, 401, "This request mus have at least !fsname || !lsname || !phone || !gender || !age || !password");

        let filename = "default.jpg";
        const code = randomLongNumber({ length: 6 });

        try {

            const pwd = await hashPWD(password);
            await saveFile({
                req,
                oldname: "avatar",
                category: "images"
            }, (er, done) => { if(done) filename = done['filename'] })

            await Users.create({
                fsname: fsname.toLowerCase(),
                lsname: lsname.toLowerCase(),
                nickname: nickname ? nickname : process.env.APPESCAPESTRING,
                phone: fillphone(phone),
                password: pwd,
                gender,
                age,
                avatar: filename,
                hospitalref: hospitalref ? hospitalref : ""
            })
            .then(user => {
                if(user instanceof Users){
                    sendMessage({
                        phone: fillphone(phone),
                        code: null,
                        content: `SOS Afia le code de vérification est : #${code} `
                    }, (e, d) => {});
                    return Response(res, 200, { user, code });
                }else return Response(res, 400, {})
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
        console.log(" Body => ",req.body);
        try {
            const { code, phone } = req.body;
            if(!phone) return Response(res, 401, "This request mus have at least || !phone ! ");
            await Users.findOne({
                where: {
                    phone: fillphone(phone),
                    status: 1
                }
            })
            .then(us => {
                if(us instanceof Users){
                    us.update({
                        isactivated: 1
                    })
                    .then(U => { return Response(res, 200, us) })
                    .catch(e => { return Response(res, 500, us) })
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
        const { latitude, longitude, hospitalref, phone, fsname, lsname, altitude, speed, description } = req.body;
        // if(!latitude || !longitude || !phone ) return Response(res, 401, "This request mus have at least !latitude || !longitude || !phone || !altitude || !speed" );
        try {
           await SOS.create({
             latitude,
             longitude,
             altitude,
             description,
             speed,
             hospitalref: hospitalref ? hospitalref : 0,
             phone: fillphone(phone),
             refsos: generateIdentifier({prefix: "sos"}),
             createdon: new Date().toLocaleString()
           })
           .then(sos => {
                if(sos){
                    // `geo:${latitude},${longitude}`
                    sendMessage({
                        phone: fillphone(process.env.MODULEGSMNUMBER),
                        content: `SOS`
                    }, (err, done) => {});
                    return Response(res, 200, sos)
                }else{
                    return Response(res, 400, req.body)
                }
           })
           .catch(err => {
                return Response(res, 500, err)
           })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // send customer message 
    sendcustomizedsmsonsos: async (req, res, next) => {
        try {

            const { to, hospitalref, content, from, from_token, to_token, fil, fullnamefrom } = req.body;
            if(!hospitalref || !to || !from || !from) return Response(res, 401, "This request must have ate least !hospitalref || !to || !from || !from")

            await Agents.findAll({
                where: {
                    // id: parseInt(to),
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
                        title: fullnamefrom.toUpperCase(),
                        subtitle: "Message from SOS Afia",
                        body: content,
                        data: req.body,
                        cs: 2 // this means is chat
                    }, (er, dn) => {
                        // console.log(dn);
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
                        pos: 1 // this means that is client
                    })
                    .then(sms => {
                        console.log(" Message sent => ", sms);
                        return Response(res, 200, sms)
                    })
                    .catch(err => {
                        console.log(" Erreur on sending message => ", err);
                        return Response(res, 500, err)
                    })
                }else{
                    console.log(" Agent on scope on sending message => ", ags);
                    return Response(res, 400, ags);
                }
            })
            .catch(err => {
                console.log(" Error in sending message => ", err);
                return Response(res, 500, err);
            });
        } catch (error) {
            console.log(" Error on sending message => ", error);
            return Response(res, 500, error);
        }
    },
    // mis a jour de l'hop. de reference 
    updatehospitalref: async (req, res, next) => {
        const { hospitalref, id, phone } = req.body;
        try {
            await Users.findOne({
                where: {
                    id,
                    status: 1
                }
            })
            .then(us => {
                if(us instanceof Users){
                    // 
                    us.update({
                        hospitalref
                    })
                    .then(U => Response(res, 200, us))
                    .catch(E => Response(res, 400, us))
                }else{
                    return Response(res, 404, req.body)
                }
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    // laod user from server
    loadme: async (req, res, next) => {
        const { phone, pushtoken } = req.body;
        if(!phone || !pushtoken) return Response(res, 401, "This request mus have at least !phone || !pushtoke");
        try {
            await Users.findOne({
                where: {
                    status: 1,
                    phone: fillphone(phone)
                }
            })
            .then(ag => {
                if(ag instanceof Users){
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