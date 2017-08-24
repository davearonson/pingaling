const {app, Menu, MenuItem, Tray} = require('electron')

let tray = null

function write_to_log() { console.log('clicked the button') }

app.on('ready', () => {
  tray = new Tray('tray_icon_black.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Log', click: write_to_log},
    {label: 'Quit', role: 'quit'},
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

