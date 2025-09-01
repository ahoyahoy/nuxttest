#!/bin/bash

# 🔧 Quick Architecture Improvements Script
# This script addresses the most common issues found in the architectural review

echo "🏗️  Starting architectural improvements..."

# 1. Fix auto-fixable ESLint issues
echo "📝 Fixing ESLint issues..."
npx eslint . --fix --ext .vue,.ts,.js

# 2. Check if pre-commit hooks should be installed
if [ ! -d ".git/hooks" ] || [ ! -f "package.json" ]; then
    echo "⚠️  Skipping pre-commit hooks setup (not a git repo or no package.json)"
else
    echo "🪝 Setting up pre-commit hooks..."
    
    # Add lint-staged and husky if not present
    if ! grep -q "lint-staged" package.json; then
        echo "Installing lint-staged and husky..."
        npm install --save-dev husky lint-staged
        
        # Add lint-staged config to package.json
        # Note: This is a simplified approach, in real scenario you'd use a proper JSON editor
        echo "Add this to your package.json:"
        cat << 'EOF'
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix"]
  },
  "scripts": {
    "prepare": "husky install"
  }
}
EOF
    fi
fi

# 3. Run type check
echo "🔍 Running TypeScript check..."
npx nuxi typecheck || echo "⚠️  TypeScript errors found - review needed"

# 4. Check for unused dependencies (if npm-check-unused is available)
if command -v depcheck &> /dev/null; then
    echo "📦 Checking for unused dependencies..."
    depcheck
else
    echo "💡 Consider installing 'depcheck' to find unused dependencies: npm install -g depcheck"
fi

# 5. Generate a simple architecture report
echo "📊 Architecture improvements completed!"
echo ""
echo "✅ Next steps:"
echo "   1. Review and commit ESLint fixes"
echo "   2. Setup pre-commit hooks (see output above)"
echo "   3. Add basic tests with: npm install --save-dev vitest @vue/test-utils"
echo "   4. Move hard-coded configs to runtime config"
echo "   5. Read ARCHITECTURE_REVIEW.md for detailed analysis"

echo ""
echo "🎉 Your architecture foundation is solid - these improvements will make it production-ready!"