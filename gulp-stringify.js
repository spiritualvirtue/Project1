var stringify = require('json-stable-stringify');
var streamMap = require('map-stream');
var	through = require('through');

module.exports = function(spaces) {
	return streamMap(function(file, cb) {
		var stream = this;

		var replacer = through(function(data) {
			var formatted = stringify(JSON.parse(data.toString()), {space: spaces});

			if (true || file.isBuffer()) {
				file.contents = new Buffer(formatted);
				cb(null, file);
			} else {
				file.contents = through();
				cb(null, file);

				file.contents.write(new Buffer(formatted));
				file.contents.end();
			}
		});

		file.pipe(replacer);
	});
};
