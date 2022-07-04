import telerivet from "telerivet";
import dotenv from 'dotenv';

dotenv.config();

const tr = new telerivet.API(process.env.app_telerivetapikey);
const project = tr.initProjectById(process.env.app_projectid);

export const sendMessage = async ({
    phone,
    code,
    content
}, cb) => {
    project.sendMessage({
        to_number: phone, 
        content
    }, function(err, message) {
        if(err){
            cb(err, undefined)
        } else {
            cb(undefined, message)
        }
    });
}