import dotenv from 'dotenv';
import { Response } from '../helpers/helper.message.js';
import { Agents } from '../models/nodel.agents.js';
import { Users } from '../models/model.users.js';
import { hashPWD } from '../helpers/helper.password';
import { fillphone } from '../helpers/helper.fillphone';

dotenv.config()

export const AgentsControllers = {
    // function axecuted on SIGNUP
    signup: async (req, res, next) => {
        const { fsname, lsname, email, phone,  password, hospitalref } = req.body;
        if(!fsname || !lsname || !phone || !email || !password) 
        return Response(res, 401, "This request mus have at least : !fsname || !lsname || !phone || !email || !password");
        
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
}