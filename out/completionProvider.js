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
exports.USLCompletionItemProvider = void 0;
const vscode = __importStar(require("vscode"));
class USLCompletionItemProvider {
    provideCompletionItems(document, position, token, context) {
        const completionItems = [];
        // Add keywords
        completionItems.push(...this.getKeywords());
        // Add shader function types
        completionItems.push(...this.getShaderFunctions());
        // Add built-in types
        completionItems.push(...this.getBuiltInTypes());
        // Add storage modifiers
        completionItems.push(...this.getStorageModifiers());
        // Add built-in functions
        completionItems.push(...this.getBuiltInFunctions());
        // Add texture and sampler functions
        completionItems.push(...this.getTextureFunctions());
        // Add math functions
        completionItems.push(...this.getMathFunctions());
        // Add attributes
        completionItems.push(...this.getAttributes());
        return completionItems;
    }
    getKeywords() {
        const keywords = [
            'if', 'else', 'while', 'for', 'return', 'break', 'continue',
            'struct', 'fn', 'as', 'in', 'out', 'inout', 'switch', 'case', 'default'
        ];
        return keywords.map(keyword => {
            const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
            item.detail = 'USL Keyword';
            return item;
        });
    }
    getShaderFunctions() {
        const shaderFunctions = [
            {
                name: 'vert',
                detail: 'Vertex shader function',
                snippet: 'vert ${1:vertexShader}(in: ${2:Vertex}) -> ${3:VertexOut} {\n\t$0\n}'
            },
            {
                name: 'frag',
                detail: 'Fragment shader function',
                snippet: 'frag ${1:fragmentShader}(in: ${2:FragmentIn}) -> ${3:float4} {\n\t$0\n}'
            },
            {
                name: 'kern',
                detail: 'Compute kernel function',
                snippet: 'kern ${1:computeShader}() -> ${2:void} {\n\t$0\n}'
            },
            {
                name: 'vertex',
                detail: 'Vertex shader function (alternative)',
                snippet: 'vertex ${1:vertexShader}(in: ${2:Vertex}) -> ${3:VertexOut} {\n\t$0\n}'
            },
            {
                name: 'fragment',
                detail: 'Fragment shader function (alternative)',
                snippet: 'fragment ${1:fragmentShader}(in: ${2:FragmentIn}) -> ${3:float4} {\n\t$0\n}'
            },
            {
                name: 'kernel',
                detail: 'Compute kernel function (alternative)',
                snippet: 'kernel ${1:computeShader}() -> ${2:void} {\n\t$0\n}'
            },
            {
                name: 'compute',
                detail: 'Compute shader function',
                snippet: 'compute ${1:computeShader}() -> ${2:void} {\n\t$0\n}'
            }
        ];
        return shaderFunctions.map(sf => {
            const item = new vscode.CompletionItem(sf.name, vscode.CompletionItemKind.Function);
            item.detail = sf.detail;
            item.insertText = new vscode.SnippetString(sf.snippet);
            item.documentation = new vscode.MarkdownString(`**${sf.detail}**\n\nDefines a shader entry point.`);
            return item;
        });
    }
    getBuiltInTypes() {
        const types = [
            // Rust-style scalar types
            'f16', 'f32', 'f64', 'i8', 'i16', 'i32', 'i64', 'u8', 'u16', 'u32', 'u64',
            // C-style scalar types
            'bool', 'int', 'uint', 'float', 'half', 'double',
            'int8', 'int16', 'int32', 'int64',
            'uint8', 'uint16', 'uint32', 'uint64',
            'float16', 'float32', 'float64',
            // Metal/HLSL vector types
            'float2', 'float3', 'float4',
            'int2', 'int3', 'int4',
            'uint2', 'uint3', 'uint4',
            'half2', 'half3', 'half4',
            'bool2', 'bool3', 'bool4',
            // GLSL vector types
            'vec2', 'vec3', 'vec4',
            'ivec2', 'ivec3', 'ivec4',
            'uvec2', 'uvec3', 'uvec4',
            'bvec2', 'bvec3', 'bvec4',
            'dvec2', 'dvec3', 'dvec4',
            // Metal/HLSL matrix types
            'float2x2', 'float2x3', 'float2x4',
            'float3x2', 'float3x3', 'float3x4',
            'float4x2', 'float4x3', 'float4x4',
            // GLSL matrix types
            'mat2', 'mat3', 'mat4',
            'mat2x2', 'mat2x3', 'mat2x4',
            'mat3x2', 'mat3x3', 'mat3x4',
            'mat4x2', 'mat4x3', 'mat4x4',
            'dmat2', 'dmat3', 'dmat4',
            // Texture types
            'texture1d', 'texture2d', 'texture3d', 'textureCube',
            'texture2dArray', 'depth2d', 'depth2dArray',
            'sampler2D', 'sampler3D', 'samplerCube',
            // Other types
            'sampler', 'sampler_state', 'buffer', 'atomic', 'void'
        ];
        return types.map(type => {
            const item = new vscode.CompletionItem(type, vscode.CompletionItemKind.TypeParameter);
            item.detail = 'Built-in type';
            return item;
        });
    }
    getStorageModifiers() {
        const modifiers = [
            { name: 'var', detail: 'Mutable variable' },
            { name: 'let', detail: 'Immutable variable' },
            { name: 'const', detail: 'Compile-time constant' },
            { name: 'static', detail: 'Static storage' },
            { name: 'uniform', detail: 'Uniform buffer' },
            { name: 'buffer', detail: 'Buffer storage' },
            { name: 'texture', detail: 'Texture resource' },
            { name: 'sampler', detail: 'Sampler state' },
            { name: 'stage_in', detail: 'Stage input qualifier' },
            { name: 'stage_out', detail: 'Stage output qualifier' }
        ];
        return modifiers.map(mod => {
            const item = new vscode.CompletionItem(mod.name, vscode.CompletionItemKind.Keyword);
            item.detail = mod.detail;
            return item;
        });
    }
    getBuiltInFunctions() {
        const functions = [
            { name: 'abs', params: '(x)', returns: 'T', desc: 'Absolute value' },
            { name: 'acos', params: '(x)', returns: 'T', desc: 'Arc cosine' },
            { name: 'asin', params: '(x)', returns: 'T', desc: 'Arc sine' },
            { name: 'atan', params: '(x)', returns: 'T', desc: 'Arc tangent' },
            { name: 'atan2', params: '(y, x)', returns: 'T', desc: 'Arc tangent of y/x' },
            { name: 'ceil', params: '(x)', returns: 'T', desc: 'Round up to nearest integer' },
            { name: 'clamp', params: '(x, min, max)', returns: 'T', desc: 'Clamp value between min and max' },
            { name: 'cos', params: '(x)', returns: 'T', desc: 'Cosine' },
            { name: 'cross', params: '(x, y)', returns: 'float3', desc: 'Cross product' },
            { name: 'distance', params: '(x, y)', returns: 'float', desc: 'Distance between points' },
            { name: 'dot', params: '(x, y)', returns: 'float', desc: 'Dot product' },
            { name: 'exp', params: '(x)', returns: 'T', desc: 'Exponential' },
            { name: 'exp2', params: '(x)', returns: 'T', desc: 'Base 2 exponential' },
            { name: 'floor', params: '(x)', returns: 'T', desc: 'Round down to nearest integer' },
            { name: 'fract', params: '(x)', returns: 'T', desc: 'Fractional part' },
            { name: 'length', params: '(x)', returns: 'float', desc: 'Vector length' },
            { name: 'log', params: '(x)', returns: 'T', desc: 'Natural logarithm' },
            { name: 'log2', params: '(x)', returns: 'T', desc: 'Base 2 logarithm' },
            { name: 'max', params: '(x, y)', returns: 'T', desc: 'Maximum value' },
            { name: 'min', params: '(x, y)', returns: 'T', desc: 'Minimum value' },
            { name: 'mix', params: '(x, y, a)', returns: 'T', desc: 'Linear interpolation' },
            { name: 'normalize', params: '(x)', returns: 'T', desc: 'Normalize vector' },
            { name: 'pow', params: '(x, y)', returns: 'T', desc: 'Power function' },
            { name: 'reflect', params: '(I, N)', returns: 'T', desc: 'Reflect vector' },
            { name: 'refract', params: '(I, N, eta)', returns: 'T', desc: 'Refract vector' },
            { name: 'round', params: '(x)', returns: 'T', desc: 'Round to nearest integer' },
            { name: 'rsqrt', params: '(x)', returns: 'T', desc: 'Reciprocal square root' },
            { name: 'saturate', params: '(x)', returns: 'T', desc: 'Clamp to [0, 1]' },
            { name: 'sign', params: '(x)', returns: 'T', desc: 'Sign of value' },
            { name: 'sin', params: '(x)', returns: 'T', desc: 'Sine' },
            { name: 'smoothstep', params: '(edge0, edge1, x)', returns: 'T', desc: 'Smooth interpolation' },
            { name: 'sqrt', params: '(x)', returns: 'T', desc: 'Square root' },
            { name: 'step', params: '(edge, x)', returns: 'T', desc: 'Step function' },
            { name: 'tan', params: '(x)', returns: 'T', desc: 'Tangent' },
            { name: 'trunc', params: '(x)', returns: 'T', desc: 'Truncate to integer' }
        ];
        return functions.map(fn => {
            const item = new vscode.CompletionItem(fn.name, vscode.CompletionItemKind.Function);
            item.detail = `${fn.name}${fn.params} -> ${fn.returns}`;
            item.documentation = new vscode.MarkdownString(fn.desc);
            item.insertText = new vscode.SnippetString(`${fn.name}($0)`);
            return item;
        });
    }
    getTextureFunctions() {
        const functions = [
            { name: 'sample', params: '(sampler, coord)', desc: 'Sample texture with sampler' },
            { name: 'read', params: '(coord)', desc: 'Read texel at coordinate' },
            { name: 'write', params: '(color, coord)', desc: 'Write texel at coordinate' },
            { name: 'gather', params: '(sampler, coord)', desc: 'Gather texture samples' },
            { name: 'sample_compare', params: '(sampler, coord, compare_value)', desc: 'Sample with depth comparison' }
        ];
        return functions.map(fn => {
            const item = new vscode.CompletionItem(fn.name, vscode.CompletionItemKind.Method);
            item.detail = `texture.${fn.name}${fn.params}`;
            item.documentation = new vscode.MarkdownString(fn.desc);
            item.insertText = new vscode.SnippetString(`${fn.name}($0)`);
            return item;
        });
    }
    getMathFunctions() {
        const functions = [
            { name: 'radians', params: '(degrees)', returns: 'T', desc: 'Convert degrees to radians' },
            { name: 'degrees', params: '(radians)', returns: 'T', desc: 'Convert radians to degrees' },
            { name: 'fma', params: '(a, b, c)', returns: 'T', desc: 'Fused multiply-add: a * b + c' },
            { name: 'fmod', params: '(x, y)', returns: 'T', desc: 'Floating-point remainder' },
            { name: 'modf', params: '(x, iptr)', returns: 'T', desc: 'Split into fractional and integer parts' },
            { name: 'ldexp', params: '(x, exp)', returns: 'T', desc: 'x * 2^exp' },
            { name: 'frexp', params: '(x, exp)', returns: 'T', desc: 'Extract mantissa and exponent' }
        ];
        return functions.map(fn => {
            const item = new vscode.CompletionItem(fn.name, vscode.CompletionItemKind.Function);
            item.detail = `${fn.name}${fn.params} -> ${fn.returns}`;
            item.documentation = new vscode.MarkdownString(fn.desc);
            item.insertText = new vscode.SnippetString(`${fn.name}($0)`);
            return item;
        });
    }
    getAttributes() {
        const attributes = [
            // Vertex attributes with #
            { name: '#position', desc: 'Vertex position attribute' },
            { name: '#color', desc: 'Vertex color attribute' },
            { name: '#normal', desc: 'Vertex normal attribute' },
            { name: '#texcoord', desc: 'Texture coordinate attribute' },
            { name: '#tangent', desc: 'Vertex tangent attribute' },
            { name: '#binormal', desc: 'Vertex binormal attribute' },
            // Metal-like stage qualifiers with @
            { name: '@stage_in', desc: 'Stage input qualifier (from previous stage)' },
            { name: '@stage_out', desc: 'Stage output qualifier (to next stage)' },
            // Buffer and resource qualifiers with @
            { name: '@buffer', desc: 'Buffer binding qualifier' },
            { name: '@texture', desc: 'Texture binding qualifier' },
            { name: '@sampler', desc: 'Sampler binding qualifier' },
            { name: '@uniform', desc: 'Uniform buffer qualifier' },
            // Function attributes with @
            { name: '@vertex', desc: 'Vertex shader entry point' },
            { name: '@fragment', desc: 'Fragment shader entry point' },
            { name: '@kernel', desc: 'Compute kernel entry point' },
            // Location/binding attributes with #
            { name: '#attribute', desc: 'Vertex attribute with index: #attribute(index)' },
            { name: '#location', desc: 'Location qualifier: #location(index)' },
            { name: '#binding', desc: 'Binding point qualifier: #binding(index)' },
            // Interpolation qualifiers with @
            { name: '@flat', desc: 'Flat interpolation (no interpolation)' },
            { name: '@smooth', desc: 'Smooth/perspective-correct interpolation' },
            { name: '@noperspective', desc: 'Linear interpolation without perspective correction' },
            // Built-in variables with #
            { name: '#vertex_id', desc: 'Built-in vertex ID' },
            { name: '#instance_id', desc: 'Built-in instance ID' },
            { name: '#fragment_coord', desc: 'Built-in fragment coordinate' },
            { name: '#front_facing', desc: 'Built-in front-facing indicator' },
            { name: '#point_size', desc: 'Built-in point size output' }
        ];
        return attributes.map(attr => {
            const item = new vscode.CompletionItem(attr.name, vscode.CompletionItemKind.Property);
            item.detail = 'Attribute';
            item.documentation = new vscode.MarkdownString(attr.desc);
            // For attributes with arguments, add snippet
            if (attr.name.includes('attribute') || attr.name.includes('location') || attr.name.includes('binding')) {
                item.insertText = new vscode.SnippetString(`${attr.name}($1)`);
            }
            return item;
        });
    }
}
exports.USLCompletionItemProvider = USLCompletionItemProvider;
//# sourceMappingURL=completionProvider.js.map