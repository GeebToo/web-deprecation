var mongoose = require('mongoose');

var belongValidator = {
    validator: function(v) {
        return v == 'ANDROID' || v == 'IOS' || v == 'API' || v == 'WINDOWS_PHONE';
    },
    message: '{VALUE} is not valid!'
}

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
    belongs_to:           { type: String,     required: true, validate: belongValidator},
    deprecation_date:     { type: Date,       required: true, default: Date.now },
    unusable_date:        { type: Date,       required: true }
});

ItemSchema.index({name: 1, group: 1}, {unique: true}); // Unique group/name key

module.exports = mongoose.model('DeprecatedItem', DeprecatedItemSchema, 'deprecated_items');