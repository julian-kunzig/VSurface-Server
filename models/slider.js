var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

SliderSchema = new Schema({
    id: {type: Number, "default": 0},
    value: {type: Number, "default": 0}
});

mongoose.model('Slider', SliderSchema);