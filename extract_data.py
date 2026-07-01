import os
import re

apps = ["baytraq", "meterlog", "madarik", "store-management", "watt"]

def parse_html_features(html_path):
    if not os.path.exists(html_path):
        return []
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    features = []
    # Match <div class="feature-card"> ... </div>
    # Using regex to find all feature cards
    cards = re.findall(r'<div class="feature-card".*?>(.*?)</div>', content, re.DOTALL)
    for card in cards:
        # Extract English title
        title_en = re.search(r'<h3[^>]*data-en.*?>(.*?)</h3>', card, re.DOTALL)
        title_en = title_en.group(1).strip() if title_en else ""
        
        # Extract Arabic title
        title_ar = re.search(r'<h3[^>]*data-ar.*?>(.*?)</h3>', card, re.DOTALL)
        title_ar = title_ar.group(1).strip() if title_ar else ""
        
        # Extract English desc
        desc_en = re.search(r'<p[^>]*data-en.*?>(.*?)</p>', card, re.DOTALL)
        desc_en = desc_en.group(1).strip() if desc_en else ""
        
        # Extract Arabic desc
        desc_ar = re.search(r'<p[^>]*data-ar.*?>(.*?)</p>', card, re.DOTALL)
        desc_ar = desc_ar.group(1).strip() if desc_ar else ""
        
        # Extract icon
        icon = re.search(r'<i class="(.*?)"></i>', card)
        icon = icon.group(1).strip() if icon else "fas fa-star"
        
        if title_en and title_ar:
            features.append({
                'title_en': title_en, 'title_ar': title_ar,
                'desc_en': desc_en, 'desc_ar': desc_ar,
                'icon': icon
            })
    return features


def parse_hero_text(html_path):
    if not os.path.exists(html_path):
        return None
        
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    title_en = re.search(r'<h1[^>]*data-en.*?>(.*?)</h1>', content, re.DOTALL)
    title_ar = re.search(r'<h1[^>]*data-ar.*?>(.*?)</h1>', content, re.DOTALL)
    
    subtitle_en = re.search(r'<p class="hero-subtitle"[^>]*data-en.*?>(.*?)</p>', content, re.DOTALL)
    subtitle_ar = re.search(r'<p class="hero-subtitle"[^>]*data-ar.*?>(.*?)</p>', content, re.DOTALL)
    
    return {
        'title_en': title_en.group(1).strip() if title_en else "",
        'title_ar': title_ar.group(1).strip() if title_ar else "",
        'subtitle_en': subtitle_en.group(1).strip() if subtitle_en else "",
        'subtitle_ar': subtitle_ar.group(1).strip() if subtitle_ar else "",
    }

for app in apps:
    old_html = f"old_apps/{app}.html"
    if app == "store-management": old_html = "old_apps/store.html"
    
    features = parse_html_features(old_html)
    hero = parse_hero_text(old_html)
    
    if not features or not hero:
        print(f"Failed to parse {app}")
        continue
        
    # Read the current app.js for this app
    js_path = f"{app}/js/app.js"
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
        
    # Replace hero title and subtitle in JS content
    # In JS: heroTitle: 'The Ultimate Debt & Installments Manager',
    
    # We will build the new features array string for EN and AR
    features_en_str = ",\n            ".join([f"{{ icon: '{f['icon']}', title: '{f['title_en']}', desc: '{f['desc_en']}' }}" for f in features])
    features_ar_str = ",\n            ".join([f"{{ icon: '{f['icon']}', title: '{f['title_ar']}', desc: '{f['desc_ar']}' }}" for f in features])
    
    # Replace in JS (we can use regex to replace the features array)
    import re
    
    def replacer_en(match):
        return f"features: [\n            {features_en_str}\n        ],"
        
    def replacer_ar(match):
        return f"features: [\n            {features_ar_str}\n        ],"

    # Split the JS content into EN and AR sections
    # Find the end of EN section (around "ar: {")
    ar_idx = js_content.find("ar: {")
    en_section = js_content[:ar_idx]
    ar_section = js_content[ar_idx:]
    
    en_section = re.sub(r'features:\s*\[.*?\]\s*,', replacer_en, en_section, flags=re.DOTALL)
    ar_section = re.sub(r'features:\s*\[.*?\]\s*,', replacer_ar, ar_section, flags=re.DOTALL)
    
    # Now for hero titles. 
    # Clean up HTML tags from titles (like <br> or <span class="highlight">)
    ht_en = hero['title_en'].replace('<span class="highlight">', '').replace('</span>', '')
    ht_ar = hero['title_ar'].replace('<span class="highlight">', '').replace('</span>', '')
    
    # Remove newlines
    ht_en = ht_en.replace('\n', ' ')
    ht_ar = ht_ar.replace('\n', ' ')
    sub_en = hero['subtitle_en'].replace('\n', ' ')
    sub_ar = hero['subtitle_ar'].replace('\n', ' ')
    
    en_section = re.sub(r"heroTitle:\s*'.*?',", f"heroTitle: '{ht_en}',", en_section)
    en_section = re.sub(r"heroSubtitle:\s*'.*?',", f"heroSubtitle: '{sub_en}',", en_section)
    
    ar_section = re.sub(r"heroTitle:\s*'.*?',", f"heroTitle: '{ht_ar}',", ar_section)
    ar_section = re.sub(r"heroSubtitle:\s*'.*?',", f"heroSubtitle: '{sub_ar}',", ar_section)
    
    final_content = en_section + ar_section
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print(f"Successfully updated features for {app}")
