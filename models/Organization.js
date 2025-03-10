const mongoose = require('mongoose');
const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['comunidad', 'club'], required: true },
    isPaid: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    accessType: {
        type: String,
        enum: ['subscription', 'fundraising', "none"], // 'subscription' = membresía, 'fundraising' = recaudación de fondos 
        required: true
    },
    fundraisingGoal: { type: Number, default: 0 }, // Meta de donaciones ($)
    fundsRaised: { type: Number, default: 0 }, // Total recaudado hasta ahora
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' },]
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;