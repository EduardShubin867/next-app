import mongoose, { Schema } from 'mongoose';

const MarkersSchema = new Schema({
  id: String,
  name: String,
  icon: String,
  description: String,
  position: Array,
  images: Array,
  color: String,
});

const MarkersModel = mongoose.model('krasnoe-bedstvie', MarkersSchema);

export default MarkersModel;
