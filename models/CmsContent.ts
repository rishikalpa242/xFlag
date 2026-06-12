import mongoose, { Document, Model } from 'mongoose';

export interface ICmsContent extends Document {
  type: string; // e.g., 'global_cms'
  data: mongoose.Schema.Types.Mixed;
}

const CmsContentSchema = new mongoose.Schema<ICmsContent>(
  {
    type: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

// Prevent re-compilation of model in dev
export const CmsContent: Model<ICmsContent> =
  mongoose.models.CmsContent || mongoose.model<ICmsContent>('CmsContent', CmsContentSchema);
