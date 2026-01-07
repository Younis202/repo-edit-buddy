#!/usr/bin/env python3
"""
Fix JSX issues in converted React components
"""
import re
from pathlib import Path

def fix_jsx_issues(jsx):
    """Fix common JSX issues"""
    
    # Fix self-closing tags (img, br, hr, input, meta, link, area, base, col, embed, param, source, track, wbr)
    self_closing_tags = ['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr']
    
    for tag in self_closing_tags:
        # Match tags that are not self-closed
        jsx = re.sub(
            rf'<{tag}([^>]*?)(?<!/)>(?!</{tag}>)',
            rf'<{tag}\1 />',
            jsx,
            flags=re.IGNORECASE | re.DOTALL
        )
    
    # Fix inline style attributes (convert to JS objects)
    # This is complex, so we'll handle basic cases
    def style_replacer(match):
        style_content = match.group(1)
        # Simple conversion: keep as string for now, React handles it
        return f'style={{{{"{style_content}"}}}}'
    
    # Actually, React can handle style="..." as string in many cases
    # Let's keep it simple and just fix the obvious issues
    
    # Fix tabindex -> tabIndex
    jsx = re.sub(r'\btabindex=', 'tabIndex=', jsx)
    
    # Fix srcset -> srcSet
    jsx = re.sub(r'\bsrcset=', 'srcSet=', jsx)
    
    # Fix maxlength -> maxLength
    jsx = re.sub(r'\bmaxlength=', 'maxLength=', jsx)
    
    # Fix colspan -> colSpan
    jsx = re.sub(r'\bcolspan=', 'colSpan=', jsx)
    
    # Fix rowspan -> rowSpan
    jsx = re.sub(r'\browspan=', 'rowSpan=', jsx)
    
    # Fix autocomplete -> autoComplete
    jsx = re.sub(r'\bautocomplete=', 'autoComplete=', jsx)
    
    # Fix readonly -> readOnly
    jsx = re.sub(r'\breadonly\b', 'readOnly', jsx)
    
    # Fix frameborder -> frameBorder
    jsx = re.sub(r'\bframeborder=', 'frameBorder=', jsx)
    
    # Fix allowfullscreen -> allowFullScreen
    jsx = re.sub(r'\ballowfullscreen\b', 'allowFullScreen', jsx)
    
    return jsx

def process_tsx_file(filepath):
    """Process a single TSX file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Apply fixes
    fixed_content = fix_jsx_issues(content)
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print(f'Fixed {filepath.name}')

if __name__ == '__main__':
    pages_dir = Path('/app/frontend/src/pages')
    
    # Process all TSX files
    for tsx_file in pages_dir.glob('*.tsx'):
        process_tsx_file(tsx_file)
    
    print('\nAll files fixed!')
