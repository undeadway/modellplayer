const $ = require("jquery");
const { remote, ipcRenderer } = require('electron');
require("./../ui/language").init($, "perferences");
const PerferencesConfig = global.PerferencesConfig ? global.PerferencesConfig : require('electron').remote.getGlobal("PerferencesConfig");

const Logic = {
	init: () => {

		let perferences = PerferencesConfig.get();
		const { language, about, setting } = perferences;
		let newObj = Object.assign({}, perferences);

		const langsSelect = $("#langs-select");
		const follows = $("#follows");
		const okBtn = $("#ok-btn");
		const applyBtn = $("#apply-btn");
		const cancelBtn = $("#cancel-btn");

		for (let name in language.list) {
			console.log(name, language.list[name]);
			let option = $(`<option value="${name}">${language.list[name]}</option>`);
			if (name === language.default) {
				option.attr("selected", "selected");
			}
			langsSelect.append(option);
		}

		for (let name in setting) {
			let obj = setting[name];
			if (obj.type !== 'html') {
				$(`#${name}`).attr(obj.type, obj.value);
			} else {
				$(`#${name}`).html(obj.value);
			}
		}

		langsSelect.on("change", (evt) => {
			newObj.language.default = langsSelect.val();
		});

		about.author.map(obj => {
			let liObj = $(`<li title="${obj.label}"></li>`);
			liObj.css({
				"background-position-x": "-" + (40 * obj.left) + "px"
			});
			liObj.on("click", () => {
				remote.shell.openExternal(obj.link);
			});
			follows.append(liObj);
		});

		function apply () {

			let setting = newObj.setting;

			for (let name in setting) {
				let obj = setting[name];
				if (obj.type !== 'html') {
					setting[name] = {
						type: obj.type,
						value: $(`#${name}`).attr(obj.type)
					};
				} else {
					setting[name] = {
						type: obj.type,
						value: $(`#${name}`).html()
					};
				}
			}

			perferences = newObj;
			PerferencesConfig.write(newObj);
		}

		function close() {
			ipcRenderer.send('closePerferencesWindow');
		}

		applyBtn.on("click", apply);
		okBtn.on("click", () => {
			apply();
			close();
		})
		cancelBtn.on("click", close);

	}
};

exports = module.exports = Logic;
