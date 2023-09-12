import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    artist: { type: String, required: true},
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    sizeUnit: { type: String, required: true },


  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;