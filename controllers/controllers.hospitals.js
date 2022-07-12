import { Response } from "../helpers/helper.message.js";
import { Hospital } from "../models/model.hospitals.js";

export const HospitalController = {
    list: async (req, res, next) => {
        try {
            await Hospital.findAll({
                where: {
                    status: 1
                }
            })
            .then(hosps => {
                return Response(res, 200, hosps)
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },
    addhospital: async (req, res, next) => {
        const { name, latitudes, longitudes } = req.body;
        if(!name || !latitudes || !longitudes) return Response(res, 401, "this request must have at leat !name || !latitudes || !longitudes")
        try {
            await Hospital.create({
                name,
                latitudes,
                longitudes
            })
            .then(hosp => {
                if(hosp instanceof Hospital){
                    return Response(res, 200, hosp)
                }else{
                    return Response(res, 400, hosp)
                }
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}