import re
import html

# Revert to the user's provided code structure but fix the issues.
with open('/Users/rasol/DevsTools/codes/web/abdulrasol.github.io/blogger_template.xml', 'r') as f:
    content = f.read()

# 1. We already fixed the SEO meta tags <b:if> blocks. That is good.
# 2. We need to fix the widgets. Right now they have raw HTML inside <div class='widget-content'>
# We will extract the raw HTML, escape it, and put it back into <b:widget-setting name='content'>
# and restore <data:content/> in the includable.

def fix_widget(widget_id, title, raw_html):
    escaped_html = html.escape(raw_html.strip(), quote=False)
    # Blogger also expects quotes to be escaped in some contexts but usually standard html.escape is enough for < and >
    return f"""<b:widget id='{widget_id}' locked='false' title='{title}' type='HTML' visible='true'>
              <b:widget-settings>
                <b:widget-setting name='content'>{escaped_html}</b:widget-setting>
              </b:widget-settings>
              <b:includable id='main'>
  <b:include name='widget-title'/>
  <div class='widget-content'>
    <data:content/>
  </div>
</b:includable>
            </b:widget>"""

# Find HTML1
html1_match = re.search(r"<b:widget id='HTML1'.*?<div class='widget-content'>(.*?)</div>\s*</b:includable>\s*</b:widget>", content, re.DOTALL)
if html1_match:
    raw_html1 = html1_match.group(1).replace("<data:content/>", "") # just in case
    new_html1 = fix_widget('HTML1', 'call', raw_html1)
    content = content.replace(html1_match.group(0), new_html1)

# Find HTML2
html2_match = re.search(r"<b:widget id='HTML2'.*?<div class='widget-content'>(.*?)</div>\s*</b:includable>\s*</b:widget>", content, re.DOTALL)
if html2_match:
    raw_html2 = html2_match.group(1).replace("<data:content/>", "")
    new_html2 = fix_widget('HTML2', 'تابعنا', raw_html2)
    content = content.replace(html2_match.group(0), new_html2)

# Save
with open('/Users/rasol/DevsTools/codes/web/abdulrasol.github.io/blogger_template.xml', 'w') as f:
    f.write(content)

print("Widgets fixed with HTML escaping!")
