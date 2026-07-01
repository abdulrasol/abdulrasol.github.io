import os
import shutil

apps = [
    {"dir": "baytraq", "en_name": "Baytraq", "ar_name": "بيترك", "prefix": "baytraq"},
    {"dir": "meterlog", "en_name": "MeterLog", "ar_name": "ميتر لوك", "prefix": "meterlog"},
    {"dir": "madarik", "en_name": "Madarik", "ar_name": "مدارك", "prefix": "madarik"},
    {"dir": "store-management", "en_name": "Store Management", "ar_name": "إدارة المخازن", "prefix": "store_management"},
    {"dir": "watt", "en_name": "Watt", "ar_name": "وات", "prefix": "watt"}
]

meaad_dir = "meaad"
files_to_copy = ["index.html", "privacy.html", "terms.html", "changelogs.html", "style.css"]
js_file = "js/app.js"

for app in apps:
    app_dir = app["dir"]
    
    # Ensure js directory exists
    os.makedirs(os.path.join(app_dir, "js"), exist_ok=True)
    
    # Copy html and css files
    for f in files_to_copy:
        src = os.path.join(meaad_dir, f)
        dst = os.path.join(app_dir, f)
        
        with open(src, "r", encoding="utf-8") as file:
            content = file.read()
        
        # We don't really need to replace names in HTML because they use Vue variables {{ t.appName }}
        # The only thing is maybe the Google site verification tag, but it's already in the meaad files!
        
        with open(dst, "w", encoding="utf-8") as file:
            file.write(content)
            
    # Process JS file
    src_js = os.path.join(meaad_dir, js_file)
    dst_js = os.path.join(app_dir, js_file)
    
    with open(src_js, "r", encoding="utf-8") as file:
        content = file.read()
        
    # Replace MEAAD references
    content = content.replace("'MEAAD'", f"'{app['en_name']}'")
    content = content.replace("'ميعاد'", f"'{app['ar_name']}'")
    content = content.replace("meaad_lang", f"{app['prefix']}_lang")
    content = content.replace("meaad_theme", f"{app['prefix']}_theme")
    
    # Optional: We could also change the hero titles/descriptions if we want, but for now just the app names
    # is enough to give each app its identity while keeping the structure.
    
    with open(dst_js, "w", encoding="utf-8") as file:
        file.write(content)
        
    print(f"Updated {app_dir} successfully!")
