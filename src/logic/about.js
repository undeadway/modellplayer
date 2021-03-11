const $ = require("jquery");
const utils = require("./../util/utils");
const process = require("process");
const os = utils.getOS();
require("./../ui/language").init($, "about");

const Logic = {
	init: () => {
		$("#os-version").text(os.type() + " " + os.arch() + " " + os.release());
		$("#nodejs-version").text(process.versions.node);
		$("#electron-version").text(process.versions.electron);
		$("#chrome-version").text(process.versions.chrome);
		$("#v8-version").text(process.versions.v8);
	}
};

exports = module.exports = Logic;
