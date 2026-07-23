#!/usr/bin/env python3
"""
WebP Image Converter

Converts PNG/JPG images in assets/ and static/images/ to WebP format
for better performance. Preserves originals for fallback.

Usage:
    python build-images.py
"""

from pathlib import Path
from PIL import Image


def convert_to_webp(source_path, quality=85):
    """Convert an image to WebP format."""
    try:
        img = Image.open(source_path)
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGBA')
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        webp_path = source_path.with_suffix('.webp')
        img.save(webp_path, 'webp', quality=quality, method=6)
        
        # Report size savings
        original_size = source_path.stat().st_size
        webp_size = webp_path.stat().st_size
        savings = (1 - webp_size / original_size) * 100
        
        print(f"✓ {source_path} → {webp_path} ({savings:.1f}% smaller)")
        return webp_path
    except Exception as e:
        print(f"✗ Failed to convert {source_path}: {e}")
        return None


def process_directory(directory, extensions=None):
    """Process all images in a directory recursively."""
    if extensions is None:
        extensions = ['*.png', '*.jpg', '*.jpeg']
    
    directory = Path(directory)
    if not directory.exists():
        print(f"Directory not found: {directory}")
        return
    
    count = 0
    for ext in extensions:
        for img_path in directory.rglob(ext):
            webp_path = img_path.with_suffix('.webp')
            if not webp_path.exists():
                if convert_to_webp(img_path):
                    count += 1
            else:
                print(f"⊘ Skipping {img_path} (webp already exists)")
    
    return count


def main():
    print("=" * 50)
    print("WebP Image Converter")
    print("=" * 50)
    
    total = 0
    
    # Process assets directory
    print("\n📁 Processing assets/...")
    count = process_directory("assets")
    if count:
        total += count
    
    # Process static/images directory
    print("\n📁 Processing static/images/...")
    count = process_directory("static/images")
    if count:
        total += count
    
    print(f"\n{'=' * 50}")
    print(f"Converted {total} images to WebP")
    print("=" * 50)


if __name__ == "__main__":
    main()
