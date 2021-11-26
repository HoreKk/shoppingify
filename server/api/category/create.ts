import type { IncomingMessage } from 'http'
import { useQuery } from 'h3'
import { Category } from '~/server/types/category'

export default async(req: IncomingMessage) => {
  const newCategory = useQuery(req)
  const newCategoryFormated = await Category.create(newCategory)
  return newCategoryFormated
}
