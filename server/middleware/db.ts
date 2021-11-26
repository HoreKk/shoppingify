import mongoose from 'mongoose'
import config from '#config'

const { connect } = mongoose

export default async() => {
  let optionsMongooseConnect = {}

  if (process.env.NODE_ENV === 'production')
    optionsMongooseConnect = { tls: true, tlsAllowInvalidCertificates: true }

  await connect(config.MONGO_URL, optionsMongooseConnect)
}
