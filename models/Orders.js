import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: Number, required: true },
    City: { type: String, required: true },
    PostalCode: { type: String, required: true },
    Street: { type: String, required: true },
    StreetNumber: { type: Number, required: true },
    Floor: { type: Number },
    ApartmentNumber: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
