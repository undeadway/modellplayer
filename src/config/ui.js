const { isWindows } = require("./../util/utils");

module.exports = exports = {
	base: {
		ico: {
			'16': '/res/ico/16_16.ico',
			'64': '/res/ico/64_64.ico',
			'512': '/res/ico/512_512.ico'
		}
	},
	ui: {
		main: {
			width: isWindows() ? 456 : 450,
			height: isWindows() ? 605 : 580
		},
		perferences: {
			width: 600,
			height: 400
		},
		about: {
			width: 350,
			height: 200
		}
	}
}