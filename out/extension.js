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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const completionProvider_1 = require("./completionProvider");
const hoverProvider_1 = require("./hoverProvider");
const definitionProvider_1 = require("./definitionProvider");
function activate(context) {
    console.log('Universal Shading Language extension is now active!');
    const selector = { language: 'usl', scheme: 'file' };
    // Register completion provider
    const completionProvider = vscode.languages.registerCompletionItemProvider(selector, new completionProvider_1.USLCompletionItemProvider(), '.', // Trigger on dot for member access
    '<', // Trigger on angle bracket for generics
    '(' // Trigger on parenthesis for function parameters
    );
    // Register hover provider
    const hoverProvider = vscode.languages.registerHoverProvider(selector, new hoverProvider_1.USLHoverProvider());
    // Register definition provider
    const definitionProvider = vscode.languages.registerDefinitionProvider(selector, new definitionProvider_1.USLDefinitionProvider());
    context.subscriptions.push(completionProvider, hoverProvider, definitionProvider);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map