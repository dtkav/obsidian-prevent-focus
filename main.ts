import { Notice, Plugin } from "obsidian";

export default class PreventFocusPlugin extends Plugin {
	private active = false;
	private ribbonIcon: HTMLElement | null = null;

	async onload() {
		this.ribbonIcon = this.addRibbonIcon(
			"shield",
			"Prevent focus stealing",
			() => this.toggle()
		);
	}

	onunload() {
		if (this.active) {
			this.restore();
		}
	}

	private toggle() {
		if (this.active) {
			this.restore();
			new Notice("Focus stealing allowed");
		} else {
			this.block();
			new Notice("Focus stealing blocked");
		}
	}

	private getWindow(): any {
		try {
			const remote = require("@electron/remote");
			return remote.getCurrentWindow();
		} catch {
			return null;
		}
	}

	private block() {
		const win = this.getWindow();
		if (!win) {
			new Notice("Could not get Electron window");
			return;
		}

		win.setFocusable(false);
		this.active = true;
		this.ribbonIcon?.addClass("is-active");
	}

	private restore() {
		const win = this.getWindow();
		if (!win) return;

		win.setFocusable(true);
		this.active = false;
		this.ribbonIcon?.removeClass("is-active");
	}
}
