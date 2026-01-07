#!/usr/bin/env python3
"""
Script to convert HTML files to React components
Extracts body content and converts to JSX
"""
import re
import os
from pathlib import Path

def extract_body_content(html_content):
    """Extract content between <body> and </body> tags"""
    body_match = re.search(r'<body[^>]*>(.*)</body>', html_content, re.DOTALL)
    if body_match:
        return body_match.group(1)
    return html_content

def extract_head_styles(html_content):
    """Extract all <style> tags from head"""
    styles = re.findall(r'<style[^>]*>(.*?)</style>', html_content, re.DOTALL)
    return '\n\n'.join(styles)

def html_to_jsx(html):
    """Convert HTML to JSX"""
    # Replace class with className
    jsx = re.sub(r'\bclass=', 'className=', html)
    
    # Replace for with htmlFor
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    
    # Fix self-closing tags that need to be closed in JSX
    jsx = re.sub(r'<(img|br|hr|input|meta|link)([^>]*?)(?<!/)>', r'<\1\2 />', jsx)
    
    # Replace some problematic attributes
    jsx = re.sub(r'<!--', '{/*', jsx)
    jsx = re.sub(r'-->', '*/}', jsx)
    
    return jsx

def extract_navigation(html_content):
    """Extract navigation/header section"""
    # Look for navigation section
    nav_match = re.search(r'<section class="css-130va89[^"]*"[^>]*>(.*?)</section>', html_content, re.DOTALL)
    if nav_match:
        return nav_match.group(1)
    return None

def extract_footer(html_content):
    """Extract footer section"""
    # Look for footer
    footer_match = re.search(r'<footer[^>]*>(.*?)</footer>', html_content, re.DOTALL)
    if footer_match:
        return footer_match.group(0)
    return None

def process_html_file(filepath):
    """Process a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract various sections
    body = extract_body_content(content)
    styles = extract_head_styles(content)
    
    return {
        'body': body,
        'styles': styles,
        'full': content
    }

if __name__ == '__main__':
    pages_dir = Path('/app/frontend/src/pages')
    output_dir = Path('/app/frontend/src/extracted')
    output_dir.mkdir(exist_ok=True)
    
    all_styles = []
    
    for html_file in pages_dir.glob('*.html'):
        print(f'Processing {html_file.name}...')
        data = process_html_file(html_file)
        
        # Save body content
        body_output = output_dir / f'{html_file.stem}_body.html'
        with open(body_output, 'w', encoding='utf-8') as f:
            f.write(data['body'])
        
        # Collect styles
        if data['styles']:
            all_styles.append(f'/* Styles from {html_file.name} */\n{data["styles"]}')
    
    # Save all styles
    styles_output = output_dir / 'all_styles.css'
    with open(styles_output, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(all_styles))
    
    print(f'Extraction complete! Check {output_dir}')
