import { User } from '~/server/types/user'

export default async() => {
  const users = await User.find()
  return users
}
