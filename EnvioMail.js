require('dotenv').config();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

async function enviarCorreo(destinatario, asunto, cuerpo){
    let mailOptions = {
        from: `Tu sistema <${process.env.GMAIL_USER}>`,
        to: destinatario,
        subject: asunto,
        html: cuerpo
    };
    try{
        let info = await transporter.sendMail(mailOptions);
        console.log('✅correo enviado con exito: %s', info.messageId);
        return { success: true, messageId: info.messageId};
    }catch(error){
        console.error('❌Error al enviar correo: %s', error);
        return {success: false, error: error.message};
    }

}
//llamamos a la funcion

enviarCorreo('enzocostareyes@gmail.com', 'BuenasNoches', `<h1>Este es un Ejemplo de envio por Email</h1>
    <p>para el curso</p>
    <b>Adios</b>`
);