import { serialize } from "cookie";
import { Request, Response, Router } from 'express';

export default function logoutHandler(req:Request, res:Response) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const serialized = serialize("myTokenName", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({
    message: "Logout successful",
  });
}