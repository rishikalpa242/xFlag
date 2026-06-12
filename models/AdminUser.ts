import mongoose, { Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const AdminUserSchema = new mongoose.Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

// Prevent re-compilation of model in dev
export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
