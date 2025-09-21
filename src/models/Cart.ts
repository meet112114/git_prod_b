import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICartItem {
  product: Types.ObjectId;  
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
}

const CartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
