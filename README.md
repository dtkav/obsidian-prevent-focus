# Prevent Focus

Obsidian plugin that adds a ribbon toggle to prevent the app from stealing window focus.

## Use Case

When running automated tests against Obsidian via Chrome DevTools Protocol, various events can cause the window to grab focus and disrupt your workspace. This plugin patches the Electron `BrowserWindow.focus()` and `BrowserWindow.show()` methods so the window stays in the background while CDP input continues to work normally.

## Usage

Click the shield icon in the ribbon to block focus stealing. Click it again to restore normal behavior. The icon is highlighted when active.
