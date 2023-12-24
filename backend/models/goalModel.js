const mongoose = require('mongoose');   // (1)

const goalSchema = mongoose.Schema({    // (2) Creates a new Mongoose schema called goalSchema using the mongoose.Schema method. A schema defines the structure of documents within a collection.
    user: {
        type: mongoose.Schema.Types.ObjectId,   // (6) Specifies the data type of the field as ObjectId, which is a unique identifier used in MongoDB
        required: true,
        ref: 'userModel',       // (7) Establishes a reference to another Mongoose model named 'userModel'. This typically indicates a relationship between the current schema and the 'User' model, where the ObjectId in this field corresponds to the _id of a document in the 'userModel' model.
    },
    text: {                     
        type: String,           // (4)
        required: [true, 'Please add a text value'],
    },

}, 
{
    timestamps: true,   // (5) Adds automatic timestamps to each document. This means that Mongoose will automatically create and update createdAt and updatedAt fields for each document in the collection.
}
)

module.exports = mongoose.model('goalModel', goalSchema);   // (3)