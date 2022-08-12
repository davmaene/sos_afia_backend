import { Response } from "../helpers/helper.message.js"
import { News } from "../models/model.news.js"

export const NewsControllers = {

    listbyrefhospital: async (req, res, next) => {
        const { hospitalref } = req.params;
        try {
            await News.findAll({
                where: {
                    status: 1,
                    hospitalref:hospitalref
                }
            })
            .then(news => {
                return Response(res, 200, news)
            })
            .catch(err => {
                console.log(" Erreur => ", err);
                return Response(res, 500, err)
            })
        } catch (error) {
            console.log(" Erreur => ", error);
            return Response(res, 500, error)
        }
    },

    listall: async (req, res, next) => {
        try {
            await News.findAll({
                where: {
                    status: 1
                }
            })
            .then(news => {
                return Response(res, 200, news)
            })
            .catch(err => {
                return Response(res, 500, err)
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    postnews: async (req, res, next) => {
        const { hospitalref, title,	content, createdon,	status,	img } = req.body;
        if(!hospitalref || !title || !content) return Response(res, 401, " This request must have at least !hospitalref || !title || !content ")
        try {
            await News.create({
                hospitalref,
                title,
                content,
                createdon: new Date().toLocaleString()
            })
            .then(news => {
                if(news instanceof News){
                    return Response(res, 200, news)
                }else return Response(res, 400, {})
            })
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}