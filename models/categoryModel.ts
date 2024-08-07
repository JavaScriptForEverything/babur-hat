import type { CategoryDocument } from '../types/category'
import type { Model } from 'mongoose'
import { Schema, models, model } from 'mongoose'

/*
{
	name: "string",
	shippingCharge: "string",
	vat: "string",
	status: "string",
	commission: "string",
}
*/

const categorySchema = new Schema<CategoryDocument>({
	name: {
		type: String,
		required: true,
		unique: true
	},
	shippingCharge: String,
	vat: String,
	status: String,
	commission: String,

	image: {
		public_id: String,
		secure_url: String,
		alt: String,
		size: String
	},
}, {
	timestamps: true,
	toJSON: {
		virtuals: true 		// required for virtual field 'subCategories'
	}
})


categorySchema.virtual('subCategories', {
	ref: 'SubCategory',
	foreignField: 'category', 				// SubCategory's category fields will be mapped 
	localField: '_id', 								// with localField's _id, because both are same in this 2 schema
})

export const Category: Model<CategoryDocument> = models.Category || model<CategoryDocument>('Category', categorySchema)
export default Category
