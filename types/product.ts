import { Types } from 'mongoose'

export type Image = {
	public_id: string
	secure_url: string
}
export type ProductDocument = {
	_id: Types.ObjectId
	id: string
	createdAt: Date
	updatedAt: Date

	user: Types.ObjectId
	name: string
	price: number
	summary: string
	description: string
	category: string
	brand: string
	size: string
	quantity: number,
	coverPhoto: Image
	images: Image[]


	slug: string
	stock: number
	sold: number
	revenue: number
	numReviews: number
	ratings: number
}

export type CreateProduct = {
	user: Types.ObjectId
	name: string
	slug: string
	price: number
	summary: string
	description: string
	category: string
	brand: string
	size: string
	quantity: number,
	coverPhoto: string
	images: string[]
}

export type UpdateProduct = {
	name: string
	slug: string
	price: number
	summary: string
	description: string
	category: string
	brand: string
	size: string
	quantity: number,
	coverPhoto: string
	images: string[]
}


// export type GetProductsArgs = {
// 	_page: number,
// 	_limit: number,
// 	_search: [Search, string],
// 	_sort: string
// }
// export type GetProductArgs = {
// 	slug: string
// }


// export type UpdateProduct = {
// 	// user: Types.ObjectId
// 	name: string
// 	price: number
// 	summary: string
// 	description: string
// 	category: string
// 	brand: string
// 	size: string
// 	quantity: number,
// 	coverPhoto: string
// 	images: string[]
// }

// export type DeleteProduct = {
// 	id: string
// }
