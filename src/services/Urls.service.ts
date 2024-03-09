import  { successResponse, errorResponse } from "../helpers/responseHandler"
import {
    saveUrlDTO
 } from "../DTOs/urls.dto"
 import CryptoJS from "crypto-js";

import UrlQueries from "../models/Urls"
import { CustomRequest } from "../middlewares/auth"


interface IUrlService {
    shortenUrl(payload: saveUrlDTO): Promise<Object>
    getUrl(req: CustomRequest): Promise<Object>
}

class UrlService implements IUrlService {
    async shortenUrl(payload: saveUrlDTO): Promise<Object> {
        try {
            const { url, slug } = payload;
            if(slug) {
                const findSlug = await UrlQueries.getUrlBySlug(slug)
                if(findSlug) return errorResponse(422, "", "Slug already in use");
            };
            const byteLength = Math.ceil(20 * 0.75);
            const randomBytes = CryptoJS.lib.WordArray.random(byteLength);
            const shortUuid = randomBytes.toString(CryptoJS.enc.Base64).slice(0, 20);     
            const createUrlPayload = {
                short_id: slug || shortUuid,
                original_url: url,
            };
            const addUrl = await UrlQueries.addUrl(createUrlPayload);
            return successResponse(201, "URL shortened successfully", addUrl)
        } catch (error) {
            return errorResponse(500, error, `An error occurred while processing request: ${error.message}`)
        }
    }

    async getUrl(req: CustomRequest): Promise<Object> {
        try {
            const shortId = req.params.id;
            const url = await UrlQueries.getUrlBySlug(shortId);
            return successResponse(200, "Url gotten successfully", url)
        } catch (error) {
            return errorResponse(500, error, `An error occurred while processing request: ${error.message}`)
        }
    }

}

export default new UrlService()