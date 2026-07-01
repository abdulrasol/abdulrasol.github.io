import os
import glob

html_files = glob.glob('*.html')

for f in html_files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace the messy window.onload
    start = content.find('window.onload = () => {')
    end = content.find('};', start) + 2
    
    if start != -1 and end != -1:
        new_onload = """window.onload = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            const savedLang = localStorage.getItem('meaad_lang');
            
            if (urlLang === 'en' || (!urlLang && savedLang === 'en')) {
                if (document.documentElement.getAttribute('lang') !== 'en' && typeof toggleLanguage === 'function') {
                    toggleLanguage();
                }
            } else if (urlLang === 'ar' || (!urlLang && savedLang === 'ar')) {
                if (document.documentElement.getAttribute('lang') !== 'ar' && typeof toggleLanguage === 'function') {
                    toggleLanguage();
                }
            }
        };"""
        
        content = content[:start] + new_onload + content[end:]
        with open(f, 'w') as file:
            file.write(content)
