import * as vscode from 'vscode';
import { USLCompletionItemProvider } from './completionProvider';
import { USLHoverProvider } from './hoverProvider';
import { USLDefinitionProvider } from './definitionProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Universal Shading Language extension is now active!');

    const selector: vscode.DocumentSelector = { language: 'usl', scheme: 'file' };

    // Register completion provider
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        selector,
        new USLCompletionItemProvider(),
        '.', // Trigger on dot for member access
        '<', // Trigger on angle bracket for generics
        '(', // Trigger on parenthesis for function parameters
        '#', // Trigger on hash for attributes
        '@'  // Trigger on at-sign for attributes
    );

    // Register hover provider
    const hoverProvider = vscode.languages.registerHoverProvider(
        selector,
        new USLHoverProvider()
    );

    // Register definition provider
    const definitionProvider = vscode.languages.registerDefinitionProvider(
        selector,
        new USLDefinitionProvider()
    );

    context.subscriptions.push(completionProvider, hoverProvider, definitionProvider);
}

export function deactivate() {}
