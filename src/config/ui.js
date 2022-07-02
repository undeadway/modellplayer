const IS_WINDOWS = require("./../util/utils").isWindows();

module.exports = exports = {
	base: {
		ico: {
			png: '/res/ico/logo.png',
			svg: '/res/ico/logo.svg',
			'16': '/res/ico/16_16.ico',
			'64': '/res/ico/64_64.ico',
			'512': '/res/ico/512_512.ico'
		}
	},
	ui: {
		main: {
			width:IS_WINDOWS ? 456 : 450,
			height: IS_WINDOWS ? 630 : 600 // windows 下，最小化到任务栏在返回后，会缩进一点，不知道为什么，所以配置中加长一段
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