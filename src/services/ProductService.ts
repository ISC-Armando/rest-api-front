import { safeParse } from "valibot";
import { DrafProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

export type ProductData = {
  [k: string]: FormDataEntryValue;
}

export async function addProduct (dataProduct: ProductData) {
  try{
    const result = safeParse(DrafProductSchema, {
      name: dataProduct.name,
      price: parseFloat(dataProduct.price as string)
    })

    if(!result.success) {
      throw new Error('Invalid Data'); 
    }

    const url = `${import.meta.env.VITE_API_URL}/api/products`
    await axios.post(url, {
      name: result.output.name,
      price: result.output.price
    })


  } catch (error) {
    console.error(error)
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const { data } = await axios(url)
    const result = safeParse(ProductsSchema, data.data)
    if(!result.success) {
      throw new Error('Invalid Data'); 
    }

    return result.output
  } catch (error) {
    console.error(error)
  }  
}

export async function getProductById(id:Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const { data } = await axios(url)
    const result = safeParse(ProductSchema, data.data)
    if(!result.success) {
      throw new Error('Invalid Data'); 
    }

    return result.output
  } catch (error) {
    console.error(error)
  }  
}

export async function updateProduct(id:Product['id'], dataProduct: ProductData) {
  try{
    const result = safeParse(ProductSchema, {
      id,
      name: dataProduct.name,
      price: parseFloat(dataProduct.price as string),
      availability: toBoolean(dataProduct.availability as string)
    })
    if(!result.success) {
      throw new Error('Invalid Data'); 
    }
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.put(url, result.output)
  } catch (error) {
    console.error(error)
  }
}


export async function deleteProduct(id:Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.delete(url)
  } catch (error) {
    console.error(error)
  }
}

export async function updateAvailability(id:Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    await axios.patch(url)
  } catch (error) {
    console.error(error)
  }
}