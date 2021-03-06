const { app, BrowserWindow, Menu, Tray, ipcMain, nativeImage } = require('electron');

exports.init = () => {

	const shouldQuit = app.requestSingleInstanceLock();

	if (!shouldQuit) {
		app.quit();
	} else {

		let mainWindow = null;

		app.on('second-instance', (event, commandLine, workingDirectory) => {
			// 当运行第二个实例时,将会聚焦到myWindow这个窗口
			if (mainWindow) {
				mainWindow.restore();
				mainWindow.focus();
			}
		});

		const path = require("path");
		const appmenu = require("./appmenu");
		const { isDebug, os } = require("./../util/utils");
		const perferencesConfig = global.PerferencesConfig.get();
		const pathType = os.isWindows() ? "64" : 'png'
		const ICON_PATH = `./../..${UiConfig.base.ico[pathType]}`;

		perferencesWindow = null, aboutWindow = null, tray = null;
		const windows = {};
		Menu.setApplicationMenu(null)

		function createMainwindow () {

			// 因为关闭窗口的时候 mainWindow 也会被清理掉，所以这里不能将 mainWindow 设置为 const
			mainWindow = new BrowserWindow({
				width: UiConfig.ui.main.width, height: UiConfig.ui.main.height,
				transparent: true,
				webPreferences: {
					nativeWindowOpen: true,
					nodeIntegration: true
				},
				resizable: false,
				minimizable: true,
				maximizable: false,
				icon: ICON_PATH
			});

			mainWindow.loadFile(__dirname + '/../../res/html/main.html');

			// 打开开发者工具
			if (isDebug()) {
				mainWindow.webContents.openDevTools();
			}

			const menu = Menu.buildFromTemplate(appmenu.main(windows));
			mainWindow.setMenu(menu);
			// Menu.setApplicationMenu(menu);

			// 当 window 被关闭，这个事件会被发出
			mainWindow.on('closed',  () => {
				// 取消引用 window 对象，如果你的应用支持多窗口的话，
				// 通常会把多个 window 对象存放在一个数组里面，
				// 但这次不是。
				exit();
			});

			mainWindow.on("close", windows.closeMainWindow);

			mainWindow.on("minimize", event => {
				if (tray === null) return;
				if (perferencesConfig.setting["min-to-tray"].value === "checked") {
					event.preventDefault();
					mainWindow.hide();
				}
			});
		}

		function createPerferencesWindow() {

			perferencesWindow = new BrowserWindow({
				width: UiConfig.ui.perferences.width, height: UiConfig.ui.perferences.height,
				transparent: true,
				webPreferences: {
					nativeWindowOpen: true,
					nodeIntegration: true
				},
				resizable: false,
				minimizable: false,
				maximizable: false,
				icon: ICON_PATH
			});
			
			perferencesWindow.setMenu(null);
			perferencesWindow.loadFile(__dirname + '/../../res/html/perferences.html');

			if (isDebug()) {
				perferencesWindow.webContents.openDevTools();
			}
			
			perferencesWindow.on('closed', function () {
				// 取消引用 window 对象，如果你的应用支持多窗口的话，
				// 通常会把多个 window 对象存放在一个数组里面，
				// 但这次不是。
				perferencesWindow = null;
			});
		}

		function createAboutWindow() {
			aboutWindow = new BrowserWindow({
				width: UiConfig.ui.about.width, height: UiConfig.ui.about.height,
				transparent: true,
				webPreferences: {
					nativeWindowOpen: true,
					nodeIntegration: true
				},
				resizable: false,
				minimizable: false,
				maximizable: false,
				icon: ICON_PATH
			});
			
			aboutWindow.setMenu(null);
			aboutWindow.loadFile(__dirname + '/../../res/html/about.html');

			if (isDebug()) {
				aboutWindow.webContents.openDevTools();
			}

			aboutWindow.on('closed', function () {
				aboutWindow = null;
			});
		}

		function createTray() {
			// 创建 tray
			const iconPath = path.join(__dirname, ICON_PATH);
			let nimage = nativeImage.createFromPath(iconPath);
			tray = new Tray(nimage);
			// 设置托盘菜单
			const menu = Menu.buildFromTemplate(appmenu.tray(windows));
			tray.setContextMenu(menu);
			tray.on("click",()=>{
				mainWindow.show();
			});
		}

		app.on('ready', function () {
			createMainwindow();
			
			if (perferencesConfig.setting["show-tray"].value === "checked") {
				createTray();
			}
		});

		windows.getMainWindow = () => {
			return mainWindow;
		};
		windows.createPerferencesWindow = () => {
			if (perferencesWindow === null) {
				createPerferencesWindow();
			}
		}
		windows.closeMainWindow = (event) => {

			if (tray === null) {
				exit();
			} else {
				if (
					event && perferencesConfig.setting["show-tray"].value === "checked"
					&& perferencesConfig.setting["close-to-tray"].value === "checked"
				) {
					event.preventDefault();
					if (mainWindow !== null) {
						mainWindow.hide();
					}
					
				} else {
					exit();
				}
			}
		};
		windows.createAboutWindow = createAboutWindow;

		function exit () {

			// 退出前释放资源
			mainWindow = null;
			perferencesWindow = null;
			aboutWindow = null;
			tray = null;

			app.exit();
		}

		windows.exit = exit;

		ipcMain.on('closePerferencesWindow', () => {
			if (perferencesWindow !== null) {
				perferencesWindow.close();
				perferencesWindow = null;
			}
		});
	}
}