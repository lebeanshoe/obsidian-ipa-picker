import { Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, TFile } from "obsidian";
import mappings from "./mapping";

// TODO: just get single-char suggest working for now
export default class SuggestorPopup extends EditorSuggest<string> {
    private active: boolean = false;

    public getActive() { return this.active; }

    public toggleActivation() {
        this.active = !this.active;
    }

    onTrigger(cursor: EditorPosition, editor: Editor, file: TFile | null): EditorSuggestTriggerInfo | null {
        const char = editor.getRange({...cursor, ch: cursor.ch-1}, cursor);
        if (char == '/' || char == '[') {
            this.active = !this.active;
            return null;
        }

        //  let {
        //     query,
        //     separatorChar
        // } = matchWordBackwards(editor, cursor, (char) => this.getCharacterRegex().test(char), this.settings.maxLookBackDistance);
        // this.separatorChar = separatorChar;

        // console.log(editor.getRange({...cursor, ch: cursor.ch-2}, {...cursor}));

        if (this.active) {
            const query = editor.getRange({...cursor, ch: cursor.ch-1}, cursor);
            
            return {
                start: cursor,
                end: cursor,
                query: query
            }
        } else {
        }

        return null;
    }
    getSuggestions(context: EditorSuggestContext): string[] | Promise<string[]> {
        console.log('getting with query:', context.query);
        return mappings[context.query];
    }
    renderSuggestion(value: string, el: HTMLElement): void {
        // SNIPPET FROM https://github.com/tth05/obsidian-completr/blob/master/src/popup.ts#L24
        const text = el.doc.createElement("div");
        text.addClass("ipa-suggestion-text");
        text.setText(value);
        el.appendChild(text);
    }
    selectSuggestion(value: string, evt: MouseEvent | KeyboardEvent): void {
        console.log('selected', value);
        if (this.context) {
            const cursor: EditorPosition = this.context.editor.getCursor();
            this.context.editor.replaceRange(value, {...cursor, ch: cursor.ch-1}, cursor);
        } else {
            console.log('context is null??')
        }
        this.close();
    }
    
}