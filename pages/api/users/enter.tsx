import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import twilio from 'twilio';
import mail from '@sendgrid/mail';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_API_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.TO_NUMBER!,
      body: `Your login token is ${payload}`,
    });
    console.log('message', message);
  } else if (email) {
    const email = await mail.send({
      from: 'hello@moztiq.com',
      to: 'moztiq@gmail.com',
      subject: 'Your Carrot Market Verification Email',
      text: `Your login token is ${payload}`,
      html: `<strong>Your login token is ${payload}</strong>`,
    });
    console.log('email', email);
  }
  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
