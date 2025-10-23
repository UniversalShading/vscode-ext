#!/bin/bash

# Universal Shading Language Extension Setup Script

echo "🧊 Setting up Universal Shading Language Extension..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✓ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Create icon PNG from SVG if ImageMagick is available
if command -v convert &> /dev/null; then
    echo "🎨 Converting icon to PNG..."
    convert -background none -resize 128x128 images/icon.svg images/icon.png 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ Icon converted successfully"
    else
        echo "⚠️  Icon conversion failed, but you can convert it manually"
        echo "   See images/ICON_SETUP.md for instructions"
    fi
elif command -v rsvg-convert &> /dev/null; then
    echo "🎨 Converting icon to PNG..."
    rsvg-convert -w 128 -h 128 images/icon.svg -o images/icon.png 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ Icon converted successfully"
    else
        echo "⚠️  Icon conversion failed, but you can convert it manually"
        echo "   See images/ICON_SETUP.md for instructions"
    fi
else
    echo "⚠️  ImageMagick or rsvg-convert not found"
    echo "   Icon PNG not created, but SVG will work for development"
    echo "   See images/ICON_SETUP.md for conversion options"
fi

echo ""

# Compile TypeScript
echo "🔨 Compiling TypeScript..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Failed to compile TypeScript"
    exit 1
fi

echo "✓ TypeScript compiled"
echo ""

echo "✨ Setup complete!"
echo ""
echo "To test the extension:"
echo "  1. Open this folder in VS Code"
echo "  2. Press F5 to launch Extension Development Host"
echo "  3. Open a .usl or .us file to test"
echo ""
echo "To package the extension:"
echo "  npm install -g @vscode/vsce"
echo "  vsce package"
echo ""
echo "Example files are available in the 'examples/' directory"
echo ""
echo "🧊 Happy Shading!"
