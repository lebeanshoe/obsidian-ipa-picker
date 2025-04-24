import { App, Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, SuggestModal, TFile } from 'obsidian';

// Remember to rename these classes and interfaces!

interface IPAPickerSettings {
    [x: string]: any;
	mySetting: string;
}

const DEFAULT_SETTINGS: IPAPickerSettings = {
	mySetting: 'default'
}

class IPASuggester extends EditorSuggest<string> {
	onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
		console.log("onTrigger not impplemented");
		return null;
	}
	getSuggestions(context: EditorSuggestContext): string[] | Promise<string[]> {
		console.log("getSuggestions not impplemented");
		return ["a","b"];
	}
	renderSuggestion(value: string, el: HTMLElement): void {
		console.log("renderSuggestion not impplemented");
	}
	selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
		console.log("selectSuggestion not impplemented");
	}

}

class Context implements EditorSuggestContext {
	editor: Editor;
	file: TFile;
	start: EditorPosition;
	end: EditorPosition;
	query: string;
}

interface Symbol {
	key: string;
	char: string;
}
  
const STANDARD_MAP: Symbol[] = [
	{ key: 'a', char: 'a' },
	{ key: 'a', char: 'æ' },
	{ key: 'a', char: 'ɐ' },
	{ key: 'a', char: 'ɑ' },
	{ key: 'a', char: 'ɒ' },

	{ key: 'b', char: 'ʙ' },
	{ key: 'b', char: 'β' },
	{ key: 'b', char: 'ɓ' },

	{ key: 'c', char: 'ç' },
	{ key: 'c', char: 'ƈ' },
	{ key: 'c', char: 'ɕ' },

	{ key: 'd', char: 'ɖ' },
	{ key: 'd', char: 'ð' },
	{ key: 'd', char: 'ɗ' },
	{ key: 'd', char: 'ʣ' },
	{ key: 'd', char: 'ʤ' },
	{ key: 'd', char: 'ʥ' },

	{ key: 'e', char: 'ə' },
	{ key: 'e', char: 'ɛ' },
	{ key: 'e', char: 'ɘ' },
	{ key: 'e', char: 'ɚ' },
	{ key: 'e', char: 'ɜ' },
	{ key: 'e', char: 'ɝ' },
	{ key: 'e', char: 'ɞ' },

	{ key: 'f', char: 'ʄ' },
	{ key: 'f', char: 'ɸ' },

	{ key: 'g', char: 'ɢ' },
	{ key: 'g', char: 'ɠ' },
	{ key: 'g', char: 'ʛ' },

	{ key: 'h', char: 'ħ' },
	{ key: 'h', char: 'ɦ' },
	{ key: 'h', char: 'ɥ' },
	{ key: 'h', char: 'ʜ' },
	{ key: 'h', char: 'ɧ' },
	{ key: 'h', char: 'ʰ' },

	{ key: 'i', char: 'ɨ' },
	{ key: 'i', char: 'ɪ' },

	{ key: 'j', char: 'ɟ' },
	{ key: 'j', char: 'ʝ' },
	{ key: 'j', char: 'ʲ' },

	{ key: 'k', char: 'ƙ' },

	{ key: 'l', char: 'ɬ' },
	{ key: 'l', char: 'ɮ' },
	{ key: 'l', char: 'ɭ' },
	{ key: 'l', char: 'ʟ' },
	{ key: 'l', char: 'ɫ' },
	{ key: 'l', char: 'ˡ' },

	{ key: 'm', char: 'ɱ' },

	{ key: 'n', char: 'ɳ' },
	{ key: 'n', char: 'ɲ' },
	{ key: 'n', char: 'ŋ' },
	{ key: 'n', char: 'ɴ' },
	{ key: 'n', char: 'ⁿ' },

	{ key: 'o', char: 'θ' },

	{ key: 'o', char: 'ø' },
	{ key: 'o', char: 'ɵ' },
	{ key: 'o', char: 'œ' },
	{ key: 'o', char: 'ɔ' },
	{ key: 'o', char: 'ɶ' },
	{ key: 'o', char: 'φ' },
	{ key: 'o', char: 'σ' },

	{ key: 'p', char: 'ƥ' },

	{ key: 'q', char: 'ʠ' },

	{ key: 'r', char: 'ɾ' },
	{ key: 'r', char: 'ɽ' },
	{ key: 'r', char: 'ʀ' },
	{ key: 'r', char: 'ʁ' },
	{ key: 'r', char: 'ɹ' },
	{ key: 'r', char: 'ɻ' },
	{ key: 'r', char: 'ɺ' },

	{ key: 's', char: 'ʃ' },
	{ key: 's', char: 'ʂ' },

	{ key: 't', char: 'ʈ' },
	{ key: 't', char: 'ƭ' },
	{ key: 't', char: 'ʦ' },
	{ key: 't', char: 'ʧ' },
	{ key: 't', char: 'ʨ' },

	{ key: 'u', char: 'ʉ' },
	{ key: 'u', char: 'ʊ' },
	{ key: 'u', char: 'μ' },

	{ key: 'v', char: 'ⱱ' },
	{ key: 'v', char: 'ʋ' },
	{ key: 'v', char: 'ʌ' },

	{ key: 'w', char: 'ʍ' },
	{ key: 'w', char: 'w' },
	{ key: 'w', char: 'ɯ' },
	{ key: 'w', char: 'ɰ' },
	{ key: 'w', char: 'ʷ' },

	{ key: 'x', char: 'χ' },
	{ key: 'x', char: 'ɤ' },

	{ key: 'y', char: 'ɣ' },
	{ key: 'y', char: 'ʎ' },
	{ key: 'y', char: 'ʏ' },
	{ key: 'y', char: 'ˠ' },

	{ key: 'z', char: 'ʒ' },
	{ key: 'z', char: 'ʐ' },
	{ key: 'z', char: 'ʑ' },
];
  

export default class IPAPicker extends Plugin {
  	private isPopupVisible: boolean = false;
	settings: IPAPickerSettings;
	containerEl: HTMLElement;

	display(): void {
		// highlight-next-line
		// let { containerEl } = this;
		const {containerEl} = this;
		containerEl.empty();
		containerEl.createEl("h1", { text: "Heading 1" });
	}

	async onload() {
		await this.loadSettings();

		const suggester = new IPASuggester(this.app);

		const view = this.app.workspace.getActiveViewOfType(MarkdownView);

		// Make sure the user is editing a Markdown file.
		if (view) {
			const cursor = view.editor.getCursor();
			const context = new Context();
			context.editor = view.editor;
			
			// let {containerEl} = this;
			// const book = containerEl.createEl("div", { cls: "book" });
			// book.createEl("div", { text: "How to Take Smart Notes", cls: "book__title" });
			// book.createEl("small", { text: "Sönke Ahrens", cls: "book__author" });

			suggester.onTrigger(cursor, view.editor, null);
			suggester.getSuggestions(context);
			suggester.renderSuggestion("test", this.containerEl);
		}

		// tutorial test
		console.log("loading plugin");
		this.addRibbonIcon('dice', 'Greet', () => {
			new Notice('Hello, world!');
		});

		// own tests
		this.addCommand({
			id: 'ipa-picker',
			name: 'IPA Picker',
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "p" }],
			callback: () => {
				new PickerModal(this.app).open();
			}
		});

		this.addCommand({
			id: 'toggle-popup',
			name: 'Toggle Popup',
			callback: () => this.togglePopup(),
		});
		this.registerEvent(
			this.app.workspace.on('editor-change', this.handleEditorChange.bind(this))
		);

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice!');
			// this.display();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Picker: Default');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
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
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	togglePopup() {
		this.isPopupVisible = !this.isPopupVisible;
	
		if (this.isPopupVisible) {
			new Notice("popup");
		  this.showPopup();
		} else {
		  this.hidePopup();
		}
	}

	handleEditorChange(cm: CodeMirror.Editor) {
		const cursor = cm.getCursor();
	
		// Specify the character that triggers the popup
		const triggerChar = '@';
	
		// Check if the current character is the trigger character
		if (cm.getRange({ line: cursor.line, ch: cursor.ch - 1 }, cursor) === triggerChar) {
		  this.togglePopup();
		}

		this.togglePopup();
	}

	showPopup() {
		const popup = document.createElement('div');
		popup.innerHTML = `
		  <div id="ipa-picker-popup" style="position: absolute; background: white; border: 1px solid #ccc; padding: 10px;">
			<p>This is a toggleable popup!</p>
		  </div>
		`;
	
		document.body.appendChild(popup);
	
		// Position the popup near the cursor or text input
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			const cursorPosition = view.editor.getScrollInfo();
			popup.style.left = cursorPosition.left + 'px';
			popup.style.top = cursorPosition.top + 'px';
		}
	  }
	
	  hidePopup() {
		const popup = document.getElementById('ipa-picker-popup');
		if (popup) {
		  document.body.removeChild(popup);
		}
	  }

	onunload() {
		console.log("unloading plugin");
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class PickerModal extends SuggestModal<Symbol> {
	// editor: Editor;
	constructor(app: App) {
		super(app);
		// this.editor = editor;
	}

	getSuggestions(query: string): Symbol[] {
		return STANDARD_MAP.filter((sym) =>
		  sym.key.includes(query.toLowerCase())
		);
	  }
	
	  // Renders each suggestion item.
	  renderSuggestion(sym: Symbol, el: HTMLElement) {
		el.createEl("div", { text: sym.char });
		// el.createEl("small", { text: book.author });
	  }
	
	  // Perform action on the selected suggestion.
	  onChooseSuggestion(sym: Symbol, evt: MouseEvent | KeyboardEvent) {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			view.editor.replaceSelection(sym.char);
		}
		new Notice(`Selected ${sym.char}`);
	  }
}

class SampleSettingTab extends PluginSettingTab {
	plugin: IPAPicker;

	constructor(app: App, plugin: IPAPicker) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl("h1", { text: "Heading 1" });

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName("Picker Layout")
			.setDesc("Change picker layout")
			.addDropdown(text => text
				.addOption("standard", "Standard")
				.addOption("place", "By Place")
				.addOption("type", "By Type"));
	}
}
