import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { Item } from '~/server/types/item'
import { Category } from '~/server/types/category'

export default async(req: IncomingMessage) => {
  const item = useQuery(req)
  const updatedItemFormated = await Item.findOneAndUpdate({ _id: item._id }, item, { new: true })
    .populate('category', '', Category)
  return updatedItemFormated
}
