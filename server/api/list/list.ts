import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { List } from '~/server/types/list'

export default async(req: IncomingMessage) => {
  // const { name, itemIds } = useQuery(req)
  return await List
    .findOne({ state: 'active' })
    .populate({ path: 'items._id', populate: { path: 'category' }})
}
