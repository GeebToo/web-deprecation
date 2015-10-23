var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name:                 { type: String,     required: true },
    group:                { type: String,     required: true },
    description:          { type: String,     required: true },
},{
    _id: false
})

var DeprecatedItemSchema = new mongoose.Schema({
    deprecated_item:      ItemSchema,
    replaced_by:          ItemSchema,
    deprecation_date:     { type: Date,       required: true, default: Date.now },
    unusable_date:        { type: Date,       required: true }
});

ItemSchema.index({name: 1, group: 1}, {unique: true}); // Unique group/name key

module.exports = mongoose.model('DeprecatedItem', DeprecatedItemSchema, 'deprecated_items');