import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  recommendationsReceived: [{
    property: { type: Schema.Types.ObjectId, ref: "Property" },
    recommendedBy: { type: Schema.Types.ObjectId, ref: "User" }
  }]
});

export default model("User", UserSchema);
