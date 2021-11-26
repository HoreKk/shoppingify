import type { IncomingMessage, ServerResponse } from 'http'
import { useQuery } from 'h3'
import { Item } from '~/server/types/item'

export default async(req: IncomingMessage, res: ServerResponse) => {
  const itemToDelete = useQuery(req)
  try {
    await Item.deleteOne({ _id: itemToDelete._id })
    res.statusCode = 200
  }
  catch (e) {
    return res
  }
}
