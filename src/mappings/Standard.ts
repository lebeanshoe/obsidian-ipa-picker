interface SymbolMap {
	key: string;
	chars: string[];
}

const STANDARD_MAP: SymbolMap[] = [
	{key:"a", chars:["a", "æ", "ɐ", "ɑ", "ɒ"]},
	{key:"b", chars:["b", "ʙ", "β", "ɓ"]},
	{key:"c", chars:["c", "ç", "ƈ", 'ɕ']},
	{key:"d", chars:["d", 'ɖ' ,'ð','ɗ','ʣ' ,'ʤ','ʥ']},
	{key:"e", chars:["e",'ə','ɛ','ɘ' ,'ɚ' ,'ɜ' , 'ɝ','ɞ'] },
	{key:"f", chars:["f", "ʄ", "ɸ"]},
	{key:"g", chars:["g", "ɢ", "ɠ", "ʛ"]},
	{key:"h", chars:["h", "ħ", "ɦ", "ʜ", "ɧ", "ɥ", "ʰ"]},
	{key:"i", chars:["i", "ɨ", "ɪ"]},
	{key:"j", chars:["j", "ɟ", "ʝ", "ʲ"]},
	{key:"k", chars:["k", "ƙ"]},
	{key:"l", chars:["l", "ɬ", "ɮ", "ɭ", "ʟ", "ɫ", "ˡ"]},
	{key:"m", chars:["m", "ɱ", "ʍ"]},
	{key:"n", chars:["n", "ɳ", "ɲ", "ŋ", "ɴ", "ⁿ"]},
	{key:"o", chars:["o", "∅", "ø", "œ", "ɔ", "ɶ", "θ"]},
	{key:"p", chars:["p", "ƥ"]},
	{key:"q", chars:["q", "ʠ", "ɸ", "θ", "ʘ"]},
	{key:"r", chars:["r", "ɾ", "ɽ", "ʀ", "ʁ", "ɹ", "ɻ", "ɺ"]},
	{key:"s", chars:["s", "ʃ", "ʂ", "ʄ"]},
	{key:"t", chars:[]},
	{key:"u", chars:[]},
	{key:"v", chars:[]},
	{key:"w", chars:[]},
	{key:"x", chars:[]},
	{key:"y", chars:[]},
	{key:"z", chars:[]},
];
/*
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
 */

const CHAR_TO_INDEX: string[] = [
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
];

export {STANDARD_MAP};
export type {SymbolMap};
