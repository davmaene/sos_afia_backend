import { Response } from "../helpers/helper.message.js"
import { News } from "../models/model.news"

export const NewsControllers = {
    listbyrefhospital: async (req, res, next) => {
        const { hospitalref } = req.params;
        try {
            await News.findAll({
                where: {
                    status: 1,
                    hospitalref
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
    }
}