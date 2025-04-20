const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemImage: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Books', 'Electronics', 'Engineering Equipments', 'Stationary', 'Sports Equipments', 'Clothing', 'Others']
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true,
        enum: ['New', 'Good', 'Poor']
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Sold']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Creating a text index for search (if needed)
//listingSchema.index({ itemName: 'text', description: 'text' });

const List = mongoose.model("Listing", listingSchema);

module.exports = List; 
