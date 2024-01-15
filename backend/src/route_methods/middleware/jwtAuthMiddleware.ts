import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SUPER_SECRET_PASSWORD } from "../../util";

export const jwtAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(400).send("No token provided");
    return;
  }
  console.log(token);

  try {
    const userData = jwt.verify(token.split(" ")[1], SUPER_SECRET_PASSWORD);
    next();
  } catch (err: any) {
    console.log(err);
    res.status(400).send("Invalid JWT");
  }
};
