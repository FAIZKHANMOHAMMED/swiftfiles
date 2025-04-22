const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    size: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    share_id: {
      type: String,
      required: true,
      unique: true
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Create index for faster querying
fileSchema.index({ owner_id: 1 });
fileSchema.index({ share_id: 1 }, { unique: true });

const File = mongoose.model('File', fileSchema);

module.exports = File; 