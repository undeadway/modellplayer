const utils = require("./../util/utils");
const [PerferencesConfig, LanguageConfig] = utils.getGlobalConfig("PerferencesConfig", "LanguageConfig");
const language = LanguageConfig.getConfig(PerferencesConfig.get().language.default);

module.exports =  {
	init: ($, pageName) => {
		let mod = language[pageName];

		$("title").html(mod.title || language.common.title);
		$("#app-version").html(language.version);
		for (let key in mod.layout) {
			$(`#${key}`).html(mod.layout[key]);
		}
	},
	getMenu: () => {
		return language.menu;
	},
	change: (name) => {
		language = LanguageConfig.getConfig(name);
	}
};