import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model } = mongoose

interface IItem extends Document {
  name: string
  note?: string | null
  image?: string | null
  category?: string
  createdAt: Date
  updatedAt: Date
}

const ItemSchema = new Schema({
  name: { type: String, required: true },
  note: { type: Schema.Types.Mixed, default: null, required: false },
  image: { type: Schema.Types.Mixed, default: null, required: false },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
}, { timestamps: true, versionKey: false })

export const Item: Model<IItem> = model('Item', ItemSchema)
