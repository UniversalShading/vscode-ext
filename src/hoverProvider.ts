import * as vscode from 'vscode';

export class USLHoverProvider implements vscode.HoverProvider {
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        const range = document.getWordRangeAtPosition(position);
        const word = document.getText(range);

        const hoverInfo = this.getHoverInfo(word);
        if (hoverInfo) {
            return new vscode.Hover(hoverInfo);
        }

        return null;
    }

    private getHoverInfo(word: string): vscode.MarkdownString | null {
        const typeInfo: { [key: string]: string } = {
            // Shader functions
            'vert': '**Vertex Shader**\n\nDefines a vertex shader entry point.',
            'frag': '**Fragment Shader**\n\nDefines a fragment shader entry point.',
            'kern': '**Compute Kernel**\n\nDefines a compute kernel entry point.',
            'vertex': '**Vertex Shader**\n\nDefines a vertex shader entry point.',
            'fragment': '**Fragment Shader**\n\nDefines a fragment shader entry point.',
            'kernel': '**Compute Kernel**\n\nDefines a compute kernel entry point.',

            // Storage modifiers
            'var': '**var**\n\nDeclares a mutable variable.',
            'let': '**let**\n\nDeclares an immutable variable.',
            'const': '**const**\n\nDeclares a compile-time constant.',
            'uniform': '**uniform**\n\nDeclares a uniform buffer binding.',
            'buffer': '**buffer**\n\nDeclares a buffer storage binding.',

            // Types
            'float': '**float**\n\n32-bit floating-point scalar type.',
            'float2': '**float2**\n\n2-component 32-bit floating-point vector.',
            'float3': '**float3**\n\n3-component 32-bit floating-point vector.',
            'float4': '**float4**\n\n4-component 32-bit floating-point vector.',
            'int': '**int**\n\n32-bit signed integer scalar type.',
            'uint': '**uint**\n\n32-bit unsigned integer scalar type.',
            'bool': '**bool**\n\nBoolean type.',
            'half': '**half**\n\n16-bit floating-point scalar type.',
            'texture2d': '**texture2d**\n\n2D texture type.\n\nMethods:\n- `sample(sampler, coord)` - Sample texture\n- `read(coord)` - Read texel\n- `write(value, coord)` - Write texel',
            'sampler': '**sampler**\n\nSampler state type for texture sampling.',

            // Built-in functions
            'dot': '**dot**(x: T, y: T) -> float\n\nComputes the dot product of two vectors.',
            'cross': '**cross**(x: float3, y: float3) -> float3\n\nComputes the cross product of two 3D vectors.',
            'normalize': '**normalize**(x: T) -> T\n\nReturns a normalized vector (length = 1).',
            'length': '**length**(x: T) -> float\n\nReturns the length (magnitude) of a vector.',
            'distance': '**distance**(x: T, y: T) -> float\n\nReturns the distance between two points.',
            'reflect': '**reflect**(I: T, N: T) -> T\n\nReflects a vector I around normal N.',
            'refract': '**refract**(I: T, N: T, eta: float) -> T\n\nRefracts a vector I through normal N with ratio eta.',
            'mix': '**mix**(x: T, y: T, a: float) -> T\n\nLinear interpolation between x and y by factor a.',
            'clamp': '**clamp**(x: T, min: T, max: T) -> T\n\nClamps x between min and max.',
            'saturate': '**saturate**(x: T) -> T\n\nClamps x to the range [0, 1].',
            'smoothstep': '**smoothstep**(edge0: T, edge1: T, x: T) -> T\n\nSmooth Hermite interpolation between edge0 and edge1.',
            'step': '**step**(edge: T, x: T) -> T\n\nReturns 0 if x < edge, otherwise 1.',
            'abs': '**abs**(x: T) -> T\n\nReturns the absolute value.',
            'sign': '**sign**(x: T) -> T\n\nReturns -1, 0, or 1 based on the sign of x.',
            'floor': '**floor**(x: T) -> T\n\nRounds down to the nearest integer.',
            'ceil': '**ceil**(x: T) -> T\n\nRounds up to the nearest integer.',
            'round': '**round**(x: T) -> T\n\nRounds to the nearest integer.',
            'fract': '**fract**(x: T) -> T\n\nReturns the fractional part.',
            'min': '**min**(x: T, y: T) -> T\n\nReturns the minimum value.',
            'max': '**max**(x: T, y: T) -> T\n\nReturns the maximum value.',
            'pow': '**pow**(x: T, y: T) -> T\n\nComputes x raised to the power y.',
            'exp': '**exp**(x: T) -> T\n\nComputes e^x.',
            'exp2': '**exp2**(x: T) -> T\n\nComputes 2^x.',
            'log': '**log**(x: T) -> T\n\nComputes the natural logarithm.',
            'log2': '**log2**(x: T) -> T\n\nComputes the base-2 logarithm.',
            'sqrt': '**sqrt**(x: T) -> T\n\nComputes the square root.',
            'rsqrt': '**rsqrt**(x: T) -> T\n\nComputes the reciprocal square root (1 / sqrt(x)).',
            'sin': '**sin**(x: T) -> T\n\nComputes the sine.',
            'cos': '**cos**(x: T) -> T\n\nComputes the cosine.',
            'tan': '**tan**(x: T) -> T\n\nComputes the tangent.',
            'asin': '**asin**(x: T) -> T\n\nComputes the arc sine.',
            'acos': '**acos**(x: T) -> T\n\nComputes the arc cosine.',
            'atan': '**atan**(x: T) -> T\n\nComputes the arc tangent.',
            'atan2': '**atan2**(y: T, x: T) -> T\n\nComputes the arc tangent of y/x.',

            // Keywords
            'struct': '**struct**\n\nDefines a structure type.',
            'fn': '**fn**\n\nDefines a function.',
            'return': '**return**\n\nReturns a value from a function.',
            'if': '**if**\n\nConditional statement.',
            'else': '**else**\n\nElse clause for conditional.',
            'for': '**for**\n\nLoop statement.',
            'while': '**while**\n\nWhile loop statement.',
            'as': '**as**\n\nType qualifier or cast.',
            'in': '**in**\n\nInput parameter qualifier.',
            'out': '**out**\n\nOutput parameter qualifier.',
            'inout': '**inout**\n\nInput/output parameter qualifier.',
            'stage_in': '**stage_in**\n\nStage input qualifier for shader parameters.',
            'stage_out': '**stage_out**\n\nStage output qualifier for shader parameters.'
        };

        if (word in typeInfo) {
            return new vscode.MarkdownString(typeInfo[word]);
        }

        return null;
    }
}
