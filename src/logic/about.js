const $ = require("jquery");
const utils = require("./../util/utils");
const { versions } = require("process");
const os = utils.getOS();
require("./../ui/language").init($, "about");
const app = JSON.parse(require("fs").readFileSync(utils.getRootPath() + "package.json"));

const Logic = {
	init: () => {

		$("#app-version").text(app.version);
		$("#nodejs-version").text(versions.node);
		$("#electron-version").text(versions.electron);
		$("#chrome-version").text(versions.chrome);
		$("#v8-version").text(versions.v8);
		$("#os-version").text(os.type() + " " + os.arch() + " " + os.release());
	}
};

exports = module.exports = Logic;
