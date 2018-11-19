<p align="center">
  <img src="https://raw.githubusercontent.com/dsa28s/detect-browser-devtools/master/resources/icon.png" width="100" height="100">
</p>

<h1 align="center">detect-browser-devtools</h1>
<h4 align="center">Detect browser (Chrome, IE, Firefox etc...) Developer Tools (Console) is opened</h4>
<p align="center">
  <img src="https://img.shields.io/badge/browser-detect-devtools-1.0.4-blue.svg?style=flat-square&logo=npm">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/dsa28s/detect-browser-devtools/master/resources/20181113020043.gif">
</p>

## Install
Use npm:

```bash
$ npm install browser-detect-devtools
```

Use cdn:

```html
<script src="https://unpkg.com/browser-detect-devtools/dist/detect-browser-devtools.min.js"></script>
```

## Usage
### NPM
```javascript
const devTools = require('browser-detect-devtools');
const devToolsManager = devTools.Manager;
```

```javascript
// Always want to clear console log of the browser's developer tools, use `alwaysConsoleClear` API.
devToolsManager.alwaysConsoleClear(true); // enable function
devToolsManager.alwaysConsoleClear(false); // disable function

// Pause the browser session when Browser's developer tools are open, use `freezeWhenDevToolsOpened` API.
devToolsManager.freezeWhenDevToolsOpened(true); // enable function
devToolsManager.freezeWhenDevToolsOpened(false); // disable function

// You can also receive events developer tools are opened, closed, and get position.
// IMPORTANT : Use this function only when in release mode.
// If you call this method, the console.log is reset regardless of the alwaysConsoleClear function called.
devToolsManager.startDevToolMonitoring((isOpened, orientation) => {
  // orientation : 'horizontal' / 'vertical' / 'separated-window'
});

// Stop monitoring devtools event.
devToolsManager.stopDevToolMonitoring();
```

### CDN
CDN create instance to global variable.

```javascript
// Always want to clear console log of the browser's developer tools, use `alwaysConsoleClear` API.
DevTools.Manager.alwaysConsoleClear(true); // enable function
DevTools.Manager.alwaysConsoleClear(false); // disable function

// Pause the browser session when Browser's developer tools are open, use `freezeWhenDevToolsOpened` API.
DevTools.Manager.freezeWhenDevToolsOpened(true); // enable function
DevTools.Manager.freezeWhenDevToolsOpened(false); // disable function

// You can also receive events developer tools are opened, closed, and get position.
// IMPORTANT : Use this function only when in release mode.
// If you call this method, the console.log is reset regardless of the alwaysConsoleClear function called.
DevTools.Manager.startDevToolMonitoring((isOpened, orientation) => {
  // orientation : 'horizontal' / 'vertical' / 'separated-window'
});

// Stop monitoring devtools event.
DevTools.Manager.stopDevToolMonitoring();
```

See the top gif image in the README.md file for details on how to do this.

## License
MIT
