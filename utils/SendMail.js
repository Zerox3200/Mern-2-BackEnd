import nodemailer from 'nodemailer';


export const SendMail = async ({ subject, html }) => {
    const MainSender = nodemailer.createTransport({
        host: "localhost",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: "ziad.ahmed01020338066@gmail.com",
            pass: "xnazpbndogezjilt"
        }
    });
    const emailInfo = await MainSender.sendMail({
        from: "ziad.ahmed01020338066@gmail.com",
        to: "ziad.ahmed01020338066@gmail.com",
        subject,
        html
    });
    if (emailInfo.accepted.length > 0) {
        return true
    }
    return false
}
export const SendMail2 = async ({ to, subject, html }) => {
    const MainSender = nodemailer.createTransport({
        host: "localhost",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: "ziad.ahmed01020338066@gmail.com",
            pass: "xnazpbndogezjilt"
        }
    });
    const emailInfo = await MainSender.sendMail({
        from: "ziad.ahmed01020338066@gmail.com",
        to,
        subject,
        html
    });
    if (emailInfo.accepted.length > 0) {
        return true
    }
    return false
}
