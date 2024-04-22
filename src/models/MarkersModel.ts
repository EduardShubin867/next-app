import mongoose, { Schema, model, models } from 'mongoose'

const MarkersSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: Array, required: true },
    img: { type: Array, required: true },
    color: { type: String, required: true },
})

const MarkersModel = models.SomeModel || model('MarkersModel', MarkersSchema)

export default MarkersModel
