// import { google } from 'googleapis';
// import { createTransport } from 'nodemailer';

// // Gmail OAuth2 configuration
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// // Send email



//  export default async function sendEmail(to, subject, text) {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transporter = createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL, // Gmail address
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken.token,
//       },
//     });

//     const mailOptions = {
//       from: `Your App Name <${process.env.EMAIL}>`,
//       to,
//       subject,
//       text,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully:', result);
//     return result;
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//     throw error;
//   }
// }

