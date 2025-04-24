import {App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, setTooltip} from "obsidian";
import SuggestorPopup from "./suggestor";

// Remember to rename these classes and interfaces!

interface IPAPickerSettings {
	mySetting: string;
	layout: string;
}

const DEFAULT_SETTINGS: IPAPickerSettings = {
    mySetting: "default",
    layout: "test"
};

export default class IPAPicker extends Plugin {
    public settings: IPAPickerSettings;

    private _suggestor: SuggestorPopup;
    private _statusBarItemEl: HTMLElement;

    // TODO
	// eslint-disable-next-line max-lines-per-function
    public async onload() {
        await this.loadSettings();

        this._suggestor = new SuggestorPopup(this.app);

        this.registerEditorSuggest(this._suggestor);

        this.addCommand({
            id: "toggle-ipa-suggestions",
            name: "Toggle IPA Suggestions",
            callback: () => {
                this._suggestor.toggleActivation();
                this._statusBarItemEl.setText(this._suggestor.getActive() ? "on" : "off");
            }
        });

		// This creates an icon in the left ribbon.
        const ribbonIconEl = this.addRibbonIcon("dice", "Sample Plugin", (evt: MouseEvent) => {
			// Called when the user clicks the icon.
            new Notice("This is a notice!");
        });
		// Perform additional things with the ribbon
        ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
        this._statusBarItemEl = this.addStatusBarItem();
        this._statusBarItemEl.setText("off");
        setTooltip(this._statusBarItemEl, "Status of IPA Suggestions");

		// This adds a simple command that can be triggered anywhere
        this.addCommand({
            id: "open-sample-modal-simple",
            name: "Open sample modal (simple)",
            callback: () => {
                new SampleModal(this.app).open();
            }
        });
		// This adds an editor command that can perform some operation on the current editor instance
        this.addCommand({
            id: "sample-editor-command",
            name: "Sample editor command",
            editorCallback: (editor: Editor, view: MarkdownView) => {
                console.log(editor.getSelection());
                editor.replaceSelection("Sample Editor Command");
            }
        });
		// This adds a complex command that can check whether the current state of the app allows execution of the command
        this.addCommand({
            id: "open-sample-modal-complex",
            name: "Open sample modal (complex)",
            checkCallback: (checking: boolean) => {
				// Conditions to check
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
                    if (!checking) {
                        new SampleModal(this.app).open();
                    }

					// This command will only show up in Command Palette when the check function returns true
                    return true;
                }
            }
        });


		// This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new IPAPickerSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
        this.registerDomEvent(document, "click", (evt: MouseEvent) => {
            console.log("click", evt);
        });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
        this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000));
    }

    public onunload() {

    }

    public async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    public async saveSettings() {
        await this.saveData(this.settings);
    }
}

class SampleModal extends Modal {
    constructor(app: App) {
        super(app);
    }

    public onOpen() {
        const {contentEl} = this;
        contentEl.setText("Woah!");
    }

    public onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}

class IPAPickerSettingTab extends PluginSettingTab {
    public plugin: IPAPicker;

    constructor(app: App, plugin: IPAPicker) {
        super(app, plugin);
        this.plugin = plugin;
    }

    public display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName("Setting #1")
            .setDesc("It's a secret")
            .addText((text) => text
                .setPlaceholder("Enter your secret")
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName("Layout")
            .setDesc("Mapping of keys to IPA characters")
            .addDropdown((cb) => cb
                .addOption("default", "default")
                .addOption("asdas", "asdas")
                .setValue(this.plugin.settings.layout)
                .onChange(async (value) => {
                    this.plugin.settings.layout = value;
                    await this.plugin.saveSettings();
                }));
    }
}
