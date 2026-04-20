import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  telefono: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} no es un número de teléfono válido (debe tener 10 dígitos)`
    }
  },
  direccion: {
    type: String,
    required: [true, 'La dirección es requerida'],
    trim: true
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    default: 1
  },
  precio_final: {
    type: Number,
    required: [true, 'El precio final es requerido'],
    default: 0
  },
  imagen_producto: {
    type: String, // URL de la imagen en movimiento (GIF/MP4)
    default: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXZueXpueXpueXpueXpueXpueXpueXpueXpueXpueXpueXpueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMGpx4ZqhYV6Y8/giphy.gif'
  },
  fecha_solicitud: {
    type: Date,
    default: Date.now
  },
  fecha_envio: {
    type: Date
  },
  total: {
    type: Number,
    default: 0
  },
  pagado: {
    type: [String],
    default: []
  },
  abono: {
    type: Number,
    default: 0
  },
  comentario: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;
