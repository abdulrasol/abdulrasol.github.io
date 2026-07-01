import os
import re

apps = ["baytraq", "meterlog", "madarik", "store-management", "watt"]

def parse_app(html_path):
    if not os.path.exists(html_path):
        return None, None
        
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract Hero text using regex (hero tags are straightforward)
    hero = {}
    m = re.search(r'<h1[^>]*data-en[^>]*>(.*?)</h1>', content, re.DOTALL)
    hero['title_en'] = m.group(1).strip() if m else ""
    m = re.search(r'<h1[^>]*data-ar[^>]*>(.*?)</h1>', content, re.DOTALL)
    hero['title_ar'] = m.group(1).strip() if m else ""
    m = re.search(r'<p class="hero-subtitle"[^>]*data-en[^>]*>(.*?)</p>', content, re.DOTALL)
    hero['subtitle_en'] = m.group(1).strip() if m else ""
    m = re.search(r'<p class="hero-subtitle"[^>]*data-ar[^>]*>(.*?)</p>', content, re.DOTALL)
    hero['subtitle_ar'] = m.group(1).strip() if m else ""

    # Extract features using string split to avoid regex nesting issues
    features = []
    parts = content.split('<div class="feature-card">')
    for part in parts[1:]: # Skip the first part before any feature-card
        # Extract title en
        t_en = re.search(r'<h3[^>]*data-en[^>]*>(.*?)</h3>', part, re.DOTALL)
        t_ar = re.search(r'<h3[^>]*data-ar[^>]*>(.*?)</h3>', part, re.DOTALL)
        p_en = re.search(r'<p[^>]*data-en[^>]*>(.*?)</p>', part, re.DOTALL)
        p_ar = re.search(r'<p[^>]*data-ar[^>]*>(.*?)</p>', part, re.DOTALL)
        
        # Get icon (it's either an emoji or an i tag)
        icon_str = "fas fa-star"
        icon_match = re.search(r'<div class="feature-icon">(.*?)</div>', part, re.DOTALL)
        if icon_match:
            icon_val = icon_match.group(1).strip()
            if '<i' in icon_val:
                im = re.search(r'<i class="(.*?)"></i>', icon_val)
                if im: icon_str = im.group(1)
            else:
                icon_str = icon_val # Emoji
                
        if t_en and t_ar:
            features.append({
                'title_en': t_en.group(1).strip(),
                'title_ar': t_ar.group(1).strip(),
                'desc_en': p_en.group(1).strip() if p_en else "",
                'desc_ar': p_ar.group(1).strip() if p_ar else "",
                'icon': icon_str
            })
            
    return hero, features

for app in apps:
    old_html = f"old_apps/{app}.html"
    if app == "store-management": old_html = "old_apps/store.html"
    
    hero, features = parse_app(old_html)
    if not hero:
        print(f"Failed to parse {app}")
        continue
        
    js_path = f"{app}/js/app.js"
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Build the feature string
    def build_feature(icon, title, desc):
        title = title.replace("'", "\\'")
        desc = desc.replace("'", "\\'").replace('\n', ' ')
        
        # Determine if icon is a font-awesome class or an emoji/svg
        if 'fa-' in icon:
            icon_val = f"<i class=\\'{icon}\\'></i>"
        else:
            icon_val = icon
            
        return f"{{ icon: '{icon_val}', title: '{title}', desc: '{desc}' }}"
        
    features_en_str = ",\n            ".join([build_feature(f['icon'], f['title_en'], f['desc_en']) for f in features])
    features_ar_str = ",\n            ".join([build_feature(f['icon'], f['title_ar'], f['desc_ar']) for f in features])
    
    # Split JS content
    ar_idx = js_content.find("ar: {")
    en_section = js_content[:ar_idx]
    ar_section = js_content[ar_idx:]
    
    # Replace features array
    en_section = re.sub(r'features:\s*\[.*?\]\s*,', f"features: [\n            {features_en_str}\n        ],", en_section, flags=re.DOTALL)
    ar_section = re.sub(r'features:\s*\[.*?\]\s*,', f"features: [\n            {features_ar_str}\n        ],", ar_section, flags=re.DOTALL)
    
    # Replace Hero
    def clean_text(t):
        return t.replace('<span class="highlight">', '').replace('</span>', '').replace("'", "\\'").replace('\n', ' ')
        
    ht_en = clean_text(hero['title_en'])
    ht_ar = clean_text(hero['title_ar'])
    sub_en = clean_text(hero['subtitle_en'])
    sub_ar = clean_text(hero['subtitle_ar'])
    
    en_section = re.sub(r"heroTitle:\s*'.*?',", f"heroTitle: '{ht_en}',", en_section)
    en_section = re.sub(r"heroSubtitle:\s*'.*?',", f"heroSubtitle: '{sub_en}',", en_section)
    
    ar_section = re.sub(r"heroTitle:\s*'.*?',", f"heroTitle: '{ht_ar}',", ar_section)
    ar_section = re.sub(r"heroSubtitle:\s*'.*?',", f"heroSubtitle: '{sub_ar}',", ar_section)
    
    final_content = en_section + ar_section
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print(f"Successfully updated features for {app}")
