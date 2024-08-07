import type { VoucherDocument } from '../types/voucher'
import type { Model } from 'mongoose'
import { Schema, models, model } from 'mongoose'

/*
{
	"customId": 'bhc000001',
	"status": 'active',
	"discount": 42,
}
*/

const voucherSchema = new Schema<VoucherDocument>({
	voucherId: String,
	// product: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Product',
	// 	required: true
	// },
	customId: {
		type: String,
		required: true,
		unique: true,
	},
	status: { 								// Review message
		type: String,
		// required: true,
		lowercase: true,
		trim: true,
	},
	redeemCode: { 								
		type: String,
		lowercase: true,
		trim: true,
	},
	discount: { 								// Review message
		type: Number,
		// required: true,
	},
	startDate: Date,
	endDate: Date


}, {
	timestamps: true,
})


voucherSchema.pre('save', function(next) {
	this.discount = +this.discount

	next()
})

export const Voucher: Model<VoucherDocument> = models.Voucher || model<VoucherDocument>('Voucher', voucherSchema)
export default Voucher
