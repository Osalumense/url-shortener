import {
    validateShortenUrl,
} from "../middlewares/validation"
import UrlsService from "../services/Urls.service"
import { Request, Response } from "express"

class UserController {
    async shortenUrl (req: Request, res: Response): Promise<Object> {
        try {
            const error: any = validateShortenUrl.parse(req.body)
            const saveUrl: any = await UrlsService.shortenUrl(req.body)
            return res.status(saveUrl.code).send(saveUrl)
        } catch (error) {
            if(error.issues) {
                const errorMessage = error.issues.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))
                console.error(errorMessage)
                return res.status(400).json({ error: errorMessage[0] })
            }
            return res.status(500).send({status: "error", message: error.message, error: error })
        }
    }

    async getUrl (req: Request, res: Response): Promise<Object> {
        try {
            const getUrl: any = await UrlsService.getUrl(req);
            return res.status(getUrl.code).send(getUrl);
        } catch (error) {
            return res.status(500).send({status: "error", message: error.message, error: error });
        }
    }
}

export default new UserController()