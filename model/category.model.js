import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    image: { type: String, default: "/uploads/images/categories/category.jpeg" },
})

const Category = model("Category", categorySchema);

export default Category;