import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model } = mongoose

interface IUser extends Document {
  email: string
  firstName: string
  lastName: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
}, { timestamps: true, versionKey: false })

export const User: Model<IUser> = model('User', UserSchema)
