import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { Item } from '~/server/types/item'

export default async(req: IncomingMessage) => {
  const { name } = useQuery(req)
  const items = await Item.aggregate()
    .match({ name: { $regex: `^${name}`, $options: 'i' } })
    .lookup({ from: 'categories', localField: 'category', foreignField: '_id', as: 'category' })
    .unwind({ path: '$category' })
    .group({ _id: '$category._id', name: { $first: '$category.name' }, items: { $push: '$$ROOT' } })
    .sort({ field: 'asc', name: 1 })
  return items
}
