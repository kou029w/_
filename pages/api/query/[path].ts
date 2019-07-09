import { Handler } from "express";
export const handler: Handler = (req, res) => res.json(req.query);
export default handler;
