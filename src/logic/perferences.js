const $ = require("jquery");
require("./../ui/language").init($, "perferences");
const PerferencesConfig = global.PerferencesConfig ? global.PerferencesConfig : require('electron').remote.getGlobal("PerferencesConfig");

const Logic = {
	init: () => {

	}
};

exports = module.exports = Logic;
