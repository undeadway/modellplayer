// const { Menu,shell,ipcMain,BrowserWindow,app } =require('electron');
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
			// {
			// 	label: '播放',
			// 	submenu: [
					{
						label: menu.play,
						submenu: [
							{
								label: menu.play,
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "play");
								}
							},
							{
								label: menu.pause,
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "pause");
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
					// {
					// 	type: 'separator'
					// },
			// 		{
			// 			label: '导入播放列表',
			// 			accelerator: 'CmdOrCtrl+Shift+I',
			// 			click() {
			// 				dialog.open(window, "importPlayList");
			// 			},
			// 		},
			// 		{
			// 			label: '导出播放列表',
			// 			accelerator: 'CmdOrCtrl+Shift+E',
			// 			click() {
			// 				windows.openWindow('user_org');
			// 			},
			// 		},
			// 		{
			// 			label: '添加到播放列表',
			// 			click() {
			// 				windows.openWindow('exports');
			// 			},
			// 			accelerator: 'CmdOrCtrl++Shift+A'
			// 		},
			// 		{
			// 			label: '从播放列表中删除',
			// 			click() {
			// 				windows.openWindow('exports');
			// 			},
			// 			accelerator: 'CmdOrCtrl++Shift+D'
			// 		}
			// 	]
			// },
			{
				label: menu.help,
				submenu: [
					{
						label: menu.about,
						click() {
							windows.openAboutWindow();
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
						label: menu.play,
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "play");
						}
					},
					{
						label: menu.pause,
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "pause");
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