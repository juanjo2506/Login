const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }, // Comunidad/Club pagado
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' }, 
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'mercado_pago'], required: true }, // Método de pago
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }, // Estado del pago
    createdAt: { type: Date, default: Date.now } // Fecha del pago

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;