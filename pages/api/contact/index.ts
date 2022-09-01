import nodemailer from "nodemailer";
import dotenv from 'dotenv';
/* eslint-disable import/no-anonymous-default-export */


export default function (req, res) {
    require('dotenv').config()

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      service:'gmail',
      port: 587,     
         auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSM,
           },
    });
    
    const mailData = {
        from: 'prueba@prueba.com',
        to: process.env.EMAIL,
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    }
  
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    })
  
    console.log(req.body)
    res.send('success')
  }