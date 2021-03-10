const $ = require("jquery");
const { shell } =require('electron').remote;
require("./../ui/language").init($, "perferences");
const PerferencesConfig = global.PerferencesConfig ? global.PerferencesConfig : require('electron').remote.getGlobal("PerferencesConfig");

const Logic = {
	init: () => {

		const { language, about } = PerferencesConfig.get();

		const langsSelect = $("#langs-select");
		const follows = $("#follows");

		for (let name in language.list) {
			console.log(name, language.list[name]);
			let option = $(`<option value="${name}">${language.list[name]}</option>`);
			if (name === language.default) {
				option.attr("selected", "selected");
			}
			langsSelect.append(option);
		}

		about.author.map(obj => {
			let liObj = $(`<li title="${obj.label}"></li>`);
			liObj.css({
				"background-position-x": "-" + (40 * obj.left) + "px"
			});
			liObj.on("click", () => {
				shell.openExternal(obj.link);
			});
			follows.append(liObj);
		});

	}
};

exports = module.exports = Logic;
