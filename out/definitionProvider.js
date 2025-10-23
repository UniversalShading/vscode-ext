"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USLDefinitionProvider = void 0;
const vscode = __importStar(require("vscode"));
class USLDefinitionProvider {
    provideDefinition(document, position, token) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return null;
        }
        const word = document.getText(wordRange);
        const text = document.getText();
        // Find struct definitions
        const structRegex = new RegExp(`struct\\s+${word}\\s*\\{`, 'g');
        let match = structRegex.exec(text);
        if (match) {
            const pos = document.positionAt(match.index);
            return new vscode.Location(document.uri, pos);
        }
        // Find function definitions
        const fnRegex = new RegExp(`\\b(fn|vert|frag|kern|vertex|fragment|kernel|compute)\\s+${word}\\s*[<(]`, 'g');
        match = fnRegex.exec(text);
        if (match) {
            const pos = document.positionAt(match.index);
            return new vscode.Location(document.uri, pos);
        }
        // Find variable declarations
        const varRegex = new RegExp(`\\b(var|let|const)\\s+${word}\\s*[:=]`, 'g');
        match = varRegex.exec(text);
        if (match) {
            const pos = document.positionAt(match.index);
            return new vscode.Location(document.uri, pos);
        }
        return null;
    }
}
exports.USLDefinitionProvider = USLDefinitionProvider;
//# sourceMappingURL=definitionProvider.js.map