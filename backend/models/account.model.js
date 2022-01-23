export default mongoose => {
    const schema = mongoose.Schema(
        {
            fullname: String,
            email: String,
            password: String,
            token: String
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

    const Account = mongoose.model('account', schema)
    return Account
}