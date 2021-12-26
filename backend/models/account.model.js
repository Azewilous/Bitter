export default mongoose => {
    const schema = mongoose.Schema(
        {
            first_name: String,
            last_name: String,
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