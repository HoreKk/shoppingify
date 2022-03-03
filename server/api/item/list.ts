import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { ICategory } from './../../types/category'
import { IItem } from './../../types/item'
import { Item } from '~/server/types/item'

interface List extends ICategory {
  items: IItem[]
}

export default async(req: IncomingMessage) => {
  const { name, itemIds } = useQuery(req)
  const items = await Item.aggregate()
    .match(itemIds ? { _id: { $in: [itemIds] } } : {})
    .match({ name: { $regex: `^${name}`, $options: 'i' } })
    .lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
    .unwind({ path: '$category' })
    .group({ _id: '$category._id', name: { $first: '$category.name' }, items: { $push: '$$ROOT' } })
    .sort({ name: 1 }) as List[]
  return items
}
