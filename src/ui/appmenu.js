const { shell } =require('electron');
const dialog = require("./dialog");
const actions = require("./../logic/actions");
const menu = require("./language").getMenu();

module.exports = exports = {
	main: (windows) => {
		return [
			{
				label: menu.file,
				submenu: [
					{
						label: menu.openFile,
						click() {
							dialog.open(windows.getMainWindow(), "openFile");
						},
						accelerator: 'CmdOrCtrl+O'
					},
					{
						label: menu.openDirectory,
						click() {
							dialog.open(windows.getMainWindow(), "openDirectory");
						},
						accelerator: 'CmdOrCtrl+D'
					},
					{
						type: 'separator'
					},
					{
						label: menu.perferences,
						click() {
							windows.createPerferencesWindow();
						},
						accelerator: 'CmdOrCtrl+P'
					},
					{
						type: 'separator'
					},
					{
						label: menu.exit,
						click() {
							windows.exit();
						}
					}
				]
			},
			{
				label: menu.play,
				submenu: [
					{
						label: menu.play,
						submenu: [
							{
								label: menu.playOrPause,
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "playOrPause");
								}
							},
							{
								label: menu.stop,
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "stop");
								}
							},
							{
								label: menu.back,
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "back");
								}
							},
							{
								label: menu.next,
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "next");
								}
							},
						]
					},
					{
						label: menu.playList,
						submenu: [
							{
								label: menu.importPlaylist
							},
							{
								label: menu.exportPlaylist
							},
							{
								label: menu.addToPlaylist
							},
							{
								label: menu.delFromPlaylist
							}
						]
					}
				]
			},
			{
				label: menu.help,
				submenu: [
					{
						label: menu.about,
						click() {
							windows.createAboutWindow();
						}
					}
				]
			}
		]
	},
	tray: (windows) => {
		return [
			{
				label: menu.play,
				submenu: [
					{
						label: menu.playOrPause,
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "playOrPause");
						}
					},
					{
						label: menu.stop,
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "stop");
						}
					},
					{
						label: menu.back,
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "back");
						}
					},
					{
						label: menu.next,
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "next");
						}
					},
				]
			},
			{
				label: menu.playList,
				submenu: [
					{
						label: menu.importPlaylist
					},
					{
						label: menu.exportPlaylist
					},
					{
						label: menu.addToPlaylist
					},
					{
						label: menu.delFromPlaylist
					}
				]
			},
			{
				label: menu.main,
				click () {
					windows.show();
				}
			},
			{
				type: 'separator'
			},
			{
				label: menu.exit,
				click() {
					windows.exit();
				}
			}
		];
	}
};