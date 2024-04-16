const express = require('express')
const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

const app = express()




app.use('/send', async (req, res) => {
  const username = process.env.SMTP_USERNAME || null
  const password = process.env.SMTP_PASSWORD || null
  if (!username || !password) {
    throw new Error('SMTP_USERNAME and SMTP_PASSWORD must be set')
  }


  const transporter = nodemailer.createTransport(smtp({
    service: 'Gmail',
    auth: {
        user: 'internhub.iitm.tech@gmail.com',
        pass: 'dcbu ocje acut tbbw'
    }
  }));

  const text = `Just saying hello. \n\n- Your friend, ${username}`;

  var mailOptions = {
    from: username,
    to: 'adasimobenio@gmail.com',
    // bcc: '<bcc email addres>',
    subject: 'starter-nodemailer',
    text
  };

  const sendRes = await transporter.sendMail(mailOptions);

  // const errorResponse = {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       error: error.message,
  //     }),
  //   };
  // }
  // const successResponse = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: `Email processed succesfully!`
  //   }),
  // };

  res.json(sendRes).end()
})

app.use('*', (req, res) => {
  res.json({ msg: 'no route handler found' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
