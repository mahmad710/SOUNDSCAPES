const { Safepay } = require('@sfpy/node-sdk')

const safepay = new Safepay({
  environment: 'sandbox',
  apiKey: process.env.SAFEPAY_SECRET_KEY,
  v1Secret: process.env.SAFEPAY_V1_SECRET,
  webhookSecret: process.env.SAFEPAY_WEBHOOK_SECRET,
})

module.exports = safepay