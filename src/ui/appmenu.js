const { shell } = require('electron');
const windows = require("./windows");

exports = module.exports = [
	{
		label: '文件',
		submenu: [
			{
				label: '打开',
				accelerator: 'CmdOrCtrl+O',
				click() {
					windows.openWindow('books');
				},
			},
			{
				label: '添加',
				accelerator: 'CmdOrCtrl+A',
				click() {
					windows.openWindow('user_org');
				},
			},
			{
				label: '播放',
				submenu: [
					{
						label: '播放',
						accelerator: 'CmdOrCtrl+P',
						click() {
						}
					},
					{
						label: '暂停',
						accelerator: 'CmdOrCtrl+T',
						click() {
						}
					},
					{
						label: '停止',
						accelerator: 'CmdOrCtrl+S',
						click() {
						}
					},
					{
						label: '上一首',
						accelerator: 'CmdOrCtrl+B',
						click() {
						}
					},
					{
						label: '下一首',
						accelerator: 'CmdOrCtrl+N',
						click() {
						}
					},
				]
			},
			{
				type: 'separator'
			},
			{
				label: '首选项',
				click() {
					windows.openWindow('exports');
				},
				accelerator: 'CmdOrCtrl+A'
			},
			{
				type: 'separator'
			},
			{
				label: '退出', role: 'quit'
			}
		]
	},
	{
		label: '播放列表',
		submenu: [
			{
				label: '导出播放列表',
				accelerator: 'CmdOrCtrl+Shift+E',
				click() {
					windows.openWindow('user_org');
				},
			},
			{
				label: '添加到播放列表',
				click() {
					windows.openWindow('exports');
				},
				accelerator: 'CmdOrCtrl++Shift+I'
			},
			{
				type: 'separator'
			},
			{
				label: '退出', role: 'quit'
			}
		]
	},
	{
		label: '帮助',
		submenu: [
			{
				label: '使用文档',
				click() { shell.openExternal(process.cwd() + './help/index.html'); }
			},
			{
				label: '关于',
				click() { shell.openExternal('http://waygc.net'); }
			}
		]
	}
];