import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
const saltRounds = 10;
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || "";
export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    const data = await user;
    const accessToken = jwt.sign(data, accessTokenSecret, {
      expiresIn: "24h",
    });
    const refreshToken = jwt.sign(data, refreshTokenSecret, {
      expiresIn: "7d",
    });

    user
      .then((data) =>
        res.status(200).send({
          message: "Successfully Sign up",
          data,
          accessToken,
          refreshToken,
        })
      )
      .catch((err) =>
        res.status(400).send({ err, message: "Cannot signup user" })
      );
  } catch (error) {
    res.status(400).send({
      message: "Could not create user beacuase username is already taken",
    });
  }
};
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (user) {
    const result = await bcrypt.compareSync(password, user.password);

    if (result === true) {
      const accessToken = jwt.sign(user, accessTokenSecret, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign(user, refreshTokenSecret, {
        expiresIn: "7d",
      });
      res.status(200).send({
        message: "Successful login",
        user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(403).send({ message: "wrong password" });
    }
  } else {
    res.status(403).send({ message: "wrong credentials" });
  }
};
