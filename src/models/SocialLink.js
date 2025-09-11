import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    socialName: {
      type: String,
      required: true,
    },
    socialIcon: {
      type: String, // এখানে icon এর জন্য URL বা icon class (যেমন FontAwesome) রাখতে পারো
      required: true,
    },
    socialLink: {
      type: String, // social media profile/page link
      required: true,
    },
    creatorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SocialLink =
  mongoose.models.SocialLink || mongoose.model("SocialLink", socialLinkSchema);
export default SocialLink;
