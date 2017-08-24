const {app, Menu, MenuItem, Tray} = require('electron')
const notify = require('electron-main-notification')

let tray = null

function write_to_log() { console.log('clicked the button') }

// weird scoping... i wouldn't have thought this would work!
function toggle_icon() {
  cur_img_idx = 1 - cur_img_idx
  restore_icon
}

function whiten_icon() { tray.setImage('tray_icon_white.png') }
function restore_icon() { tray.setImage(images[cur_img_idx]) }

app.on('ready', () => {
  images = ['tray_icon_black.png', 'tray_icon_purple.png']
  cur_img_idx = 0
  tray = new Tray(images[cur_img_idx])
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Toggle Icon', click: toggle_icon},
    {label: 'Log', click: write_to_log},
    {label: 'Quit', role: 'quit'},
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  tray.on('mouse-enter', whiten_icon)
  tray.on('mouse-leave', restore_icon)
  notify('This is a notification!',
         { body: 'See? Really easy to use!' },
         () => { console.log('The notification got clicked on!') })
})
