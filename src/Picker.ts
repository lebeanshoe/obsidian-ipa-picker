import {App, MarkdownView, Notice, SuggestModal} from "obsidian";
import {STANDARD_MAP, SymbolMap} from "./mappings/Standard";

interface CharIndex {
	index: number;
	char: string;
}

export default class PickerModal extends SuggestModal<CharIndex> {
	// editor: Editor;
	constructor(app: App) {
		super(app);
		// this.editor = editor;
	}

	public getSuggestions(query: string): CharIndex[] {
		const maps: SymbolMap[] = STANDARD_MAP.filter((sym) => {
			return sym.key === query;
		});
		const chars =  maps.length === 1 ? maps[0].chars : [];
		return chars.map((char) => {
			return {index: chars.indexOf(char)+1, char:char};
		});
	}

	// Renders each suggestion item.
	public renderSuggestion(sym: CharIndex, el: HTMLElement) {
		el.createEl("div", {text: sym.index + ": " + sym.char});
		// el.createEl("small", { text: book.author });
	}

	// Perform action on the selected suggestion.
	public onChooseSuggestion(sym: CharIndex, evt: MouseEvent | KeyboardEvent) {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (view) {
			view.editor.replaceSelection(sym.char);
		}
		new Notice(`Selected ${sym}`);
	}
}
