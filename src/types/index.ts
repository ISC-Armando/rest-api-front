import { number, object, string, InferOutput, array, boolean } from "valibot";

export const DrafProductSchema = object({
  name: string(),
  price: number()
})

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean()
})

export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>