import { Category } from '~/server/types/category'

export default async() => {
  const categories = await Category.find()
  return categories
}
