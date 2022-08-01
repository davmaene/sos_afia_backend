import compressing from 'compressing';
import fileUpload from 'express-fileupload';
import { generateFilename } from '../helpers/helper.random.js';

function resolved(result) {
    // console.log(result);
    return result;
}
  
function rejected(result) {
    // console.error(result);
    return result;
}
  

export const saveFile = async ({ req, oldname, category }, cb) => {
    cb = typeof cb === "function" ? cb : (e, d) => {} ;
    let filename;
    let uploadPath;

    try {
        if (!req.files || Object.keys(req.files).length === 0) {

            return Promise.reject(new Error(JSON.stringify({
                code: 1, // means no file to be uploaded,
                message: "means no file to be uploaded",
                data: req['files']
            }))).then(resolved, rejected)
    
        }else{
    
            filename = req['files'][oldname];
            const tempname = generateFilename({ tempname: filename.name, prefix: "SOS-afia-avatar-" })
            uploadPath = `assets/images/${tempname}`;
    
            try {
                filename.mv(uploadPath, function(err) {
                    if (err){
                        cb(
                            {
                                code: 3 || 4,
                                message: "Unknown error",
                                data: err
                            },
                            undefined
                        )
                        return Promise.reject(
                                new Error(JSON.stringify({
                                    code: 3 || 4,
                                    message: "Unknown error",
                                    data: err
                                }))
                        ).then(resolved, rejected)
                    } else {
                        cb(
                            undefined,
                            {
                                code: 2,
                                message: "Upload done !",
                                data: {
                                    filename: tempname,
                                    oldname: filename.name
                                }
                            }
                        )
                        compressing.gzip.compressFile(uploadPath, `assets/compressed/${tempname}.zip`)
                        .then(done => {
                            console.log(" Compressing done => ", done);
                        })
                        .catch(err => {
                            console.log(" Erreur compressing => ", err);
                        });
                        return Promise.resolve({
                            code: 2,
                            message: "Upload done !",
                            data: {
                                filename: tempname,
                                oldname: filename.name
                            }
                        }).then(resolved, rejected)
                    }
                });
            } catch (error) {
                cb(
                    {
                        code: 4,
                        message: "Unknown error",
                        data: error
                    },
                    undefined
                )
                return Promise.reject(
                    new Error(JSON.stringify( 
                        {
                            code: 4,
                            message: "Error occured",
                            data: error
                        }
                    ))
                ).then(resolved, rejected)
            }
        }
    } catch (error) {
        return Promise.reject(new Error(JSON.stringify({
            code: 1, // means no file to be uploaded,
            message: "means no file to be uploaded",
            data: req['files']
        }))).then(resolved, rejected)
    }
}