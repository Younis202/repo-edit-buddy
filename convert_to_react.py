#!/usr/bin/env python3
"""
Convert extracted HTML body content to React JSX components
"""
import re
import os
from pathlib import Path

def html_to_jsx(html):
    """Convert HTML to JSX with minimal changes"""
    jsx = html
    
    # Replace class with className
    jsx = re.sub(r'\bclass="', 'className="', jsx)
    jsx = re.sub(r"\bclass='", "className='", jsx)
    
    # Replace for with htmlFor
    jsx = re.sub(r'\bfor="', 'htmlFor="', jsx)
    jsx = re.sub(r"\bfor='", "htmlFor='", jsx)
    
    # Handle comments
    jsx = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', jsx, flags=re.DOTALL)
    
    # Fix style tags (convert to dangerouslySetInnerHTML or move to separate CSS)
    jsx = re.sub(r'<style[^>]*>(.*?)</style>', '', jsx, flags=re.DOTALL)
    
    # Fix noscript (keep as is for now)
    # jsx = re.sub(r'<noscript>(.*?)</noscript>', '', jsx, flags=re.DOTALL)
    
    return jsx

def create_react_component(name, jsx_content):
    """Create a React component from JSX content"""
    component_name = name.replace('Page', '')
    
    component = f"""export default function {name}() {{
  return (
    <div className="page-wrapper">
      {jsx_content.strip()}
    </div>
  );
}}
"""
    return component

def process_page(html_file, output_dir):
    """Process a single HTML body file and create React component"""
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Convert to JSX
    jsx = html_to_jsx(html)
    
    # Get component name from filename
    component_name = html_file.stem.replace('_body', '')
    
    # Create component
    component_code = create_react_component(component_name, jsx)
    
    # Save component
    output_file = output_dir / f'{component_name}.tsx'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(component_code)
    
    print(f'Created {output_file.name}')

if __name__ == '__main__':
    extracted_dir = Path('/app/frontend/src/extracted')
    output_dir = Path('/app/frontend/src/pages')
    
    # Process all extracted body HTML files
    for html_file in extracted_dir.glob('*_body.html'):
        process_page(html_file, output_dir)
    
    print('\nConversion complete!')
