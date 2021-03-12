const $ = require("jquery");
const utils = require("./../util/utils");
const { versions } = require("process");
const os = utils.getOS();
require("./../ui/language").init($, "about");

const Logic = {
	init: () => {

		$("#os-version").text(os.type() + " " + os.arch() + " " + os.release());
		$("#nodejs-version").text(versions.node);
		$("#electron-version").text(versions.electron);
		$("#chrome-version").text(versions.chrome);
		$("#v8-version").text(versions.v8);
	}
};

exports = module.exports = Logic;
