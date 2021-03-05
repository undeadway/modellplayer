const { app, BrowserWindow, Menu, Tray } = require('electron');
const path = require("path");

exports.init = () => {
	
	const appmenu = require("./appmenu");
	const utils = require("./../util/utils");

	let mainWindow, perferencesWindow, tray;
	const windows = {};

	function createMainwindow () {

		// 因为关闭窗口的时候 mainWindow 也会被清理掉，所以这里不能将 mainWindow 设置为 const
		mainWindow = new BrowserWindow({
			width: AppConfig.ui.main.width, height: AppConfig.ui.main.height,
			transparent: true,
			webPreferences: {
				nativeWindowOpen: true,
				nodeIntegration: true
			},
			minimizable: true,
			maximizable: false,
			icon: `./../..${AppConfig.base.ico[16]}`
		});

		// mainWindow.setMenu(null);
		mainWindow.loadURL(__dirname + '/../../res/html/main.html');

		// 打开开发者工具
		if (utils.isDevMode()) {
			mainWindow.webContents.openDevTools();
		}

		const menu = Menu.buildFromTemplate(appmenu.main(windows));
		Menu.setApplicationMenu(menu);

		// 当 window 被关闭，这个事件会被发出
		mainWindow.on('closed', function () {
			// 取消引用 window 对象，如果你的应用支持多窗口的话，
			// 通常会把多个 window 对象存放在一个数组里面，
			// 但这次不是。
			mainWindow = null;
			tray = null;
			app.quit();
		});

		mainWindow.on("minimize", event => {
			event.preventDefault();
			mainWindow.hide();
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

	function createTray() {
		const iconPath = path.join(__dirname,`./../..${AppConfig.base.ico[16]}`);
		tray = new Tray(iconPath);
		tray.setToolTip('never forget');
		// 设置托盘菜单
		const menu = Menu.buildFromTemplate(appmenu.tray(windows));
		tray.setContextMenu(menu);

		tray.on("click",()=>{
			mainWindow.show();
		});
	}

	app.on('ready', function () {
		createMainwindow();
		createPerferencesWindow();
		createTray();
	});

	windows.getMainWindow = () => {
		return mainWindow;
	};
	windows.showPerferencesWindow = () => {
		perferencesWindow.show();
	}

	windows.quit = () => {
		app.quit();
	}
}