const $ = require("jquery");
require("./../ui/language").init($, "perferences");
const PerferencesConfig = global.PerferencesConfig ? global.PerferencesConfig : require('electron').remote.getGlobal("PerferencesConfig");

const Logic = {
	init: () => {
		let language = PerferencesConfig.get().language;

		const langsSelect = $("#langs-select");
		for (let name in language.list) {
			console.log(name, language.list[name]);
			let option = $(`<option value="${name}">${language.list[name]}</option>`);
			if (name === language.default) {
				option.attr("selected", "selected");
			}
			langsSelect.append(option);
		}

	}
};

exports = module.exports = Logic;
