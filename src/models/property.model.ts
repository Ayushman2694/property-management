import { Schema, model } from "mongoose";

const PropertySchema = new Schema({
  title: String,
  type: String,
  price: Number,
  state: String,
  city: String,
  areaSqFt: Number,
  bedrooms: Number,
  bathrooms: Number,
  amenities: [String],
  furnished: String,
  availableFrom: Date,
  listedBy: String, // might store the name of the lister
  tags: [String],
  colorTheme: String,
  rating: Number,
  isVerified: Boolean,
  listingType: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" } // to track who created this
}, { timestamps: true });

export default model("Property", PropertySchema);
