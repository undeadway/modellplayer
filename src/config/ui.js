const IS_WINDOWS = require("./../util/utils").isWindows();

module.exports = exports = {
	base: {
		ico: '/res/images/logo.png'
		// ico: {
		// 	'16': '/res/ico/16_16.ico',
		// 	'64': '/res/ico/64_64.ico',
		// 	'512': '/res/ico/512_512.ico'
		// }
	},
	ui: {
		main: {
			width:IS_WINDOWS ? 456 : 450,
			height: IS_WINDOWS ? 605 : 580
		},
		perferences: {
			width: 600,
			height: 400
		},
		about: {
			width: IS_WINDOWS ? 350 :  400,
			height: IS_WINDOWS ? 200 : 210
		}
	}
}