import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SUPER_SECRET_PASSWORD } from "../../util";

export const cookieJwtAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  console.log(token);

  try {
    const userData = jwt.verify(token, SUPER_SECRET_PASSWORD);
    next();
  } catch (err: any) {
    console.log(err);
    res.status(400).send("Invalid JWT");
  }
};
