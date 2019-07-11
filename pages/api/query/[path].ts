import { NextApiRequest, NextApiResponse } from "next";
export const handler = (req: NextApiRequest, res: NextApiResponse) =>
  res.json(req.query);
export default handler;
