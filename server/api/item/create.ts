import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { Item } from '~/server/types/item'

export default async(req: IncomingMessage) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...newItem } = useQuery(req)
  const newItemFormated = await Item.create(newItem)
  return newItemFormated
}
