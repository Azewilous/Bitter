export default mongoose => {
  const schema = mongoose.Schema(
    {
      user: String,
      message: String,
      likes: Number
    },
    {
      timestamps: true
    }
  )

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Narrative = mongoose.model('narrative', schema)
  return Narrative
}