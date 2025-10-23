# 🧊 Universal Shading - Extension

This is the README for your extension "usl". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

# 🧊 Universal Shading Language

VS Code extension for **Universal Shading Language (USL)** - A modern cross-platform shader language.

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Features

✨ **Syntax Highlighting** - Full support for USL syntax  
🎯 **IntelliSense** - Smart auto-completion for types, functions, and keywords  
📖 **Documentation** - Hover over symbols for instant help  
🔍 **Navigation** - Go to definition for structs, functions, and variables  
🧊 **File Icons** - Custom ice cube icons for `.usl` and `.us` files  

### Supported Syntax

```usl
// Shader functions
vert, frag, kern, vertex, fragment, kernel, compute

// Types
float, float2, float3, float4, int, uint, bool
texture2d, sampler, buffer, atomic

// Keywords
struct, fn, var, let, const, uniform, if, else, for, while, return

// Attributes
#position, #color, #normal, #texcoord
```

## Quick Start

1. Install the extension
2. Create a file with `.usl` or `.us` extension
3. Start typing - IntelliSense will guide you!

## Example Shader

```usl
// Struct definition
struct Vertex {
    position: float3 #position;
    normal: float3 #normal;
    texCoord: float2;
}

struct VertexOut {
    position: float4 #position;
    color: float4;
}

// Vertex shader
vert vertexShader(in: Vertex, uniforms: Uniform(0)) -> VertexOut {
    var out = VertexOut()
    out.position = uniforms.projectionMatrix * float4(in.position, 1.0)
    out.color = float4(1.0)
    return out
}

// Fragment shader
frag fragmentShader(in: VertexOut as stage_in) -> float4 {
    return in.color
}
```

## IntelliSense Features

**Type `vert` + Tab** - Expands to full vertex shader template  
**Type `frag` + Tab** - Expands to full fragment shader template  
**Type function names** - See auto-completion with documentation  
**Hover over symbols** - Get instant help and signatures  

## More Examples

Check the `examples/` directory for:
- Basic shaders
- PBR lighting
- Compute shaders
- Comprehensive syntax showcase

## Development

```bash
# Clone and setup
git clone <repo>
cd usl
npm install
npm run compile

# Test in VS Code
# Press F5 to launch Extension Development Host
```

## File Structure

```
usl/
├── src/                 # TypeScript source
├── syntaxes/            # TextMate grammar
├── examples/            # Example shaders
├── images/              # Icons
└── fileicons/           # File icon theme
```

## Roadmap

See [TODO.md](TODO.md) for planned features and known issues.

## Contributing

Contributions welcome! Open an issue or submit a PR.

## License

MIT

---

**Happy Shading! 🧊✨**
