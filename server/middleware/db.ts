import mongoose from 'mongoose'
import config from '#config'

const { connect } = mongoose

export default async() => {
  let optionsMongooseConnect: any = { ignoreUndefined: true }

  if (process.env.NODE_ENV === 'production')
    optionsMongooseConnect = { tls: true, tlsAllowInvalidCertificates: true, ...optionsMongooseConnect }

  await connect(config.MONGO_URL, optionsMongooseConnect)
}
