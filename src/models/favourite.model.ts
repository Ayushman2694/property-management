    import mongoose, { Schema, Document } from 'mongoose';

    export interface IFavorite extends Document {
        userId: mongoose.Schema.Types.ObjectId;
        propertyId: mongoose.Schema.Types.ObjectId;
    }

    const FavoriteSchema: Schema = new Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    });

    export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
    