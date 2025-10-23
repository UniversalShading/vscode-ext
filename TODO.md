# TODO & Roadmap

## 🚀 Planned Features

### High Priority
- [ ] **Semantic Tokens Provider** - More intelligent syntax highlighting based on context
- [ ] **Real-time Error Checking** - Show syntax errors as you type
- [ ] **Code Formatting** - Auto-format USL code (Prettier-style)
- [ ] **Snippet Library** - More code snippets for common patterns
- [ ] **Symbol Provider** - Outline view for structs and functions

### Medium Priority
- [ ] **Multi-file Support** - Go to definition across files
- [ ] **Workspace Symbol Search** - Find symbols across the entire project
- [ ] **Rename Refactoring** - Rename symbols across files
- [ ] **Code Actions** - Quick fixes and refactoring suggestions
- [ ] **Signature Help** - Show function parameters while typing

### Low Priority
- [ ] **Language Server Protocol (LSP)** - Full language server implementation
- [ ] **Debugger Integration** - Debug shaders in VS Code
- [ ] **Shader Compiler Integration** - Compile and show errors inline
- [ ] **Shader Preview** - Visual preview of shaders
- [ ] **Documentation Generator** - Generate docs from comments

## 🐛 Known Issues

- Definition provider only searches within the current file
- No workspace-wide symbol search yet
- No parameter hints during function calls

## 💡 Ideas

- Integration with shader debugging tools
- Live shader reload on save
- Shader performance profiler integration
- Template gallery for common shader patterns
- Color picker for color values
- Vector/matrix visualization on hover

## 📝 Notes

- Keep TextMate grammar (it's the standard, not legacy)
- Consider semantic tokens for advanced highlighting
- Explore Tree-sitter for better parsing
- Maybe add web playground integration

---

**Want to contribute?** Pick an item and open a PR! 🚀
