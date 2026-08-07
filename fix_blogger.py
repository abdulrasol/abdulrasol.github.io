import re

with open('/Users/rasol/DevsTools/codes/web/abdulrasol.github.io/blogger_template.xml', 'r') as f:
    content = f.read()

# Fix HTML1
html1_settings_match = re.search(r"<b:widget id='HTML1'.*?<b:widget-settings>\s*<b:widget-setting name='content'><!\[CDATA\[(.*?)\]\]></b:widget-setting>\s*</b:widget-settings>", content, re.DOTALL)
if html1_settings_match:
    html1_content = html1_settings_match.group(1)
    # Remove the b:widget-settings block
    content = content.replace(html1_settings_match.group(0), "<b:widget id='HTML1' locked='false' title='call' type='HTML' visible='true'>")
    # Replace <data:content/> in HTML1 with the actual html
    html1_includable = re.search(r"(<b:widget id='HTML1'.*?<div class='widget-content'>\s*)<data:content/>(\s*</div>)", content, re.DOTALL)
    if html1_includable:
        content = content.replace(html1_includable.group(0), f"{html1_includable.group(1)}\n{html1_content}\n{html1_includable.group(2)}")

# Fix HTML2
html2_settings_match = re.search(r"<b:widget id='HTML2'.*?<b:widget-settings>\s*<b:widget-setting name='content'><!\[CDATA\[(.*?)\]\]></b:widget-setting>\s*</b:widget-settings>", content, re.DOTALL)
if html2_settings_match:
    html2_content = html2_settings_match.group(1)
    # Remove the b:widget-settings block
    content = content.replace(html2_settings_match.group(0), "<b:widget id='HTML2' locked='false' title='تابعنا' type='HTML' visible='true'>")
    # Replace <data:content/> in HTML2 with the actual html
    html2_includable = re.search(r"(<b:widget id='HTML2'.*?<div class='widget-content'>\s*)<data:content/>(\s*</div>)", content, re.DOTALL)
    if html2_includable:
        content = content.replace(html2_includable.group(0), f"{html2_includable.group(1)}\n{html2_content}\n{html2_includable.group(2)}")

with open('/Users/rasol/DevsTools/codes/web/abdulrasol.github.io/blogger_template.xml', 'w') as f:
    f.write(content)

print("Widgets fixed!")
