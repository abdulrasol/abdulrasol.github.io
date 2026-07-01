import os
import shutil

apps = [
    "baytraq",
    "meterlog",
    "madarik",
    "store-management",
    "watt",
    "meaad"  # Also update meaad!
]

root_style = "style.css"

for app in apps:
    # Copy root style.css to each app
    dst = os.path.join(app, "style.css")
    shutil.copy2(root_style, dst)
    print(f"Updated {app} style successfully!")
