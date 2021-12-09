import mongoose from 'mongoose'
import type { Document, Model } from 'mongoose'
import type { ICategory } from '~/server/types/category'

const { Schema, model } = mongoose

export interface IItem extends Document {
  name: string
  note?: string | null
  image?: string | null
  category?: string
  createdAt: Date
  updatedAt: Date
}

export interface ItemList extends Omit<IItem, 'category'> {
  category: ICategory
  count: number
  checked: boolean
  edit: boolean
}

const ItemSchema = new Schema({
  name: { type: String, required: true },
  note: { type: Schema.Types.Mixed, default: null, required: false },
  image: { type: Schema.Types.Mixed, default: null, required: false },
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
}, { timestamps: true, versionKey: false })

export const Item: Model<IItem> = model('Item', ItemSchema)
