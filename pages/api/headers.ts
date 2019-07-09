import { Handler } from "express";
export const handler: Handler = (req, res) => res.json(req.headers);
export default handler;
