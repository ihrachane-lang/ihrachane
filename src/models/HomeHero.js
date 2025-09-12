import mongoose from "mongoose";

const HomeHeroSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL ba base64
});

const HomeHero = mongoose.models.Post || mongoose.model("Post", HomeHeroSchema);

export default HomeHero;
