const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const appmenu = require("./appmenu");
const utils = require("./../util/utils");

let mainWindow, perferencesWindow;

exports.init = () => {

	function createMainwindow () {

		// 因为关闭窗口的时候 mainWindow 也会被清理掉，所以这里不能将 mainWindow 设置为 const
		mainWindow = new BrowserWindow({
			width: AppConfig.ui.main.width, height: AppConfig.ui.main.height,
			transparent: true,
			webPreferences: {
				nativeWindowOpen: true,
				nodeIntegration: true
			},
			minimizable: false,
			maximizable: false,
			icon: `./../..${AppConfig.base.ico[16]}`
		});

		// mainWindow.setMenu(null);
		mainWindow.loadURL(__dirname + '/../../res/html/main.html');

		// 打开开发者工具
		if (utils.isDevMode()) {
			mainWindow.webContents.openDevTools();
		}

		const menu = Menu.buildFromTemplate(appmenu(mainWindow));
		Menu.setApplicationMenu(menu);

		// 当 window 被关闭，这个事件会被发出
		mainWindow.on('closed', function () {
			// 取消引用 window 对象，如果你的应用支持多窗口的话，
			// 通常会把多个 window 对象存放在一个数组里面，
			// 但这次不是。
			mainWindow = null;
		});
	}

	function createPerferencesWindow() {

		perferencesWindow = new BrowserWindow({
			width: AppConfig.ui.perferences.width, height: AppConfig.ui.perferences.height,
			transparent: true,
			webPreferences: {
				nativeWindowOpen: true,
				nodeIntegration: true
			},
			minimizable: false,
			maximizable: false,
			icon: `./../..${AppConfig.base.ico[16]}`
		});
		
		perferencesWindow.setMenu(null);
		perferencesWindow.loadURL(__dirname + '/../../res/html/perferences.html');
		
		perferencesWindow.on('closed', function () {
			// 取消引用 window 对象，如果你的应用支持多窗口的话，
			// 通常会把多个 window 对象存放在一个数组里面，
			// 但这次不是。
			perferencesWindow = null;
		});
		
		perferencesWindow.hide();
	}

	app.on('ready', function () {
		createMainwindow();
	});
}
 exports.openWindow = () => {
	perferencesWindow.show();
}