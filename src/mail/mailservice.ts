import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()

export class MailService{
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      }

    async sendResetPasswordEmail(email: string, resetToken: string){
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested for a password reset. Click the link below to reset your password:</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>If you didn't request this, please ignore this email.</p>
      `,
        }

        return this.transporter.sendMail(mailOptions);
    }  
}