import re

apps = ["baytraq", "meterlog", "madarik", "store-management", "watt"]

for app in apps:
    filepath = f"{app}/index.html"
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the privacy alert block
    # It starts with <div class="privacy-alert"> and ends at the next </section> inside the features section.
    # Actually, let's just remove the data privacy section which has <div class="privacy-alert">
    content = re.sub(r'<div class="privacy-alert">.*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Alternatively, just remove the specific block:
    # <div class="privacy-alert"> ... </div> (the whole thing)
    content = re.sub(r'<div class="privacy-alert">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Remove the testimonials section completely
    content = re.sub(r'<section id="testimonials" class="section">.*?</section>', '', content, flags=re.DOTALL)
    
    # And remove the nav link for testimonials
    content = re.sub(r'<a href="#testimonials"[^>]*>\{\{\s*t\.navTestimonials\s*\}\}</a>', '', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Cleaned up {filepath}")
