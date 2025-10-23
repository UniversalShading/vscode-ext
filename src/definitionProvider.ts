import * as vscode from 'vscode';

export class USLDefinitionProvider implements vscode.DefinitionProvider {
    provideDefinition(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Definition | vscode.LocationLink[]> {
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
