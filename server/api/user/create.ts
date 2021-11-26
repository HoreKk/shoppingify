import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { User } from '~/server/types/user'

export default async(req: IncomingMessage) => {
  const newUser = useQuery(req)
  const newUserFormated = await User.create(newUser)
  return newUserFormated
}
