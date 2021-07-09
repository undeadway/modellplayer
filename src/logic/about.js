const $ = require("jquery");
const { getRootPath, os } = require("./../util/utils");
const { versions } = require("process");
const _os = os.get();
require("./../ui/language").init($, "about");

const Logic = {
	init: () => {

		$("#nodejs-version").html(versions.node);
		$("#electron-version").html(versions.electron);
		$("#chrome-version").html(versions.chrome);
		$("#v8-version").html(versions.v8);
		$("#os-version").html(_os.type() + " " + _os.arch() + " " + _os.release());
	}
};

exports = module.exports = Logic;
