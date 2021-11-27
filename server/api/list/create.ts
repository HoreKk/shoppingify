import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { List } from '~/server/types/list'

export default async(req: IncomingMessage) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...newList } = useQuery(req)
  const newListFormated = await List.create(newList)
  return newListFormated
}
