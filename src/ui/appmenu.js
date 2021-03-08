// const { Menu,shell,ipcMain,BrowserWindow,app } =require('electron');
const { shell } =require('electron');
const dialog = require("./../logic/dialog");
const actions = require("./../logic/actions");

module.exports = exports = {
	main: (windows) => {
		return [
			{
				label: '文件',
				submenu: [
					{
						label: '打开文件',
						accelerator: 'CmdOrCtrl+F',
						click() {
							dialog.open(windows.getMainWindow(), "openFile");
						}
					},
					{
						label: '打开文件夹',
						accelerator: 'CmdOrCtrl+D',
						click() {
							dialog.open(windows.getMainWindow(), "openDirectory");
						}
					},
					{
						type: 'separator'
					},
					{
						label: '首选项',
						click() {
							windows.createPerferencesWindow();
						},
						accelerator: 'CmdOrCtrl+P'
					},
					{
						type: 'separator'
					},
					{
						label: '退出',
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
						label: '播放',
						submenu: [
							{
								label: '播放',
								accelerator: 'CmdOrCtrl+S',
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "play");
								}
							},
							{
								label: '暂停',
								accelerator: 'CmdOrCtrl+P',
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "pause");
								}
							},
							{
								label: '停止',
								accelerator: 'CmdOrCtrl+T',
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "stop");
								}
							},
							{
								label: '上一首',
								accelerator: 'CmdOrCtrl+B',
								click() {
									actions.chgPlayStatus(windows.getMainWindow(), "back");
								}
							},
							{
								label: '下一首',
								accelerator: 'CmdOrCtrl+N',
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
				label: '帮助',
				submenu: [
					{
						label: '关于',
						accelerator: 'CmdOrCtrl+A',
						click() { shell.openExternal('http://prj.waygc.net?modellplayer'); }
					}
				]
			}
		]
	},
	tray: (windows) => {
		return [
			{
				label: '播放',
				submenu: [
					{
						label: '播放',
						accelerator: 'CmdOrCtrl+S',
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "play");
						}
					},
					{
						label: '暂停',
						accelerator: 'CmdOrCtrl+P',
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "pause");
						}
					},
					{
						label: '停止',
						accelerator: 'CmdOrCtrl+T',
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "stop");
						}
					},
					{
						label: '上一首',
						accelerator: 'CmdOrCtrl+B',
						click() {
							actions.chgPlayStatus(windows.getMainWindow(), "back");
						}
					},
					{
						label: '下一首',
						accelerator: 'CmdOrCtrl+N',
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
				label: '退出',
				click() {
					windows.exit();
				}
			}
		];
	}
};