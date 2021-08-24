import mongoose from 'mongoose';

const { Schema } = mongoose,
  UserSchema = new Schema(
    {
      name: { type: String },
      email: { type: String, required: false },
      favoriteFood: { type: String, required: false },
      favoriteColor: { type: String, required: false },
    },
    {
      collection: 'user',
      timestamps: true,
      autoCreate: true,
    },
  );

export default mongoose.model('User', UserSchema);
