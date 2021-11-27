import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model } = mongoose

export interface ICategory extends Document {
  name: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true, versionKey: false })

export const Category: Model<ICategory> = model('Category', CategorySchema)
