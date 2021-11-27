import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'

const { Schema, model } = mongoose

interface IList extends Document {
  name: string
  items: [
    {
      item: string
      count: number
      checked: boolean
    }
  ]
  createdAt: Date
  updatedAt: Date
}

const ListSchema = new Schema({
  name: { type: String, required: true },
  items: [
    {
      item: { type: Schema.Types.ObjectId, required: true, ref: 'Item' },
      count: { type: Number, required: true },
      checked: { type: Boolean, required: true },
    },
  ],
}, { timestamps: true, versionKey: false })

export const List: Model<IList> = model('List', ListSchema)
