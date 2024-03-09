import express, { Request, Response } from "express"
import UrlsController from "../controllers/Urls.controller";

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
	res.send({ message: "Welcome to URL shortener API" });
  });
router.get(`/healthcheck`, (req: Request, res: Response) => {
	try {
		res.send({
			uptime: Math.round(process.uptime()),
			message: 'OK',
			timestamp: Date.now()
		});
	} catch (e) {
		res.status(503).end();
	}
});

router.post("/shorten", UrlsController.shortenUrl)
router.get("/:id", UrlsController.getUrl)

export default router;
