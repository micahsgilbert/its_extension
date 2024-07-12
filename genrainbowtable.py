# (thank u chatgpt)
# inspect element to copy the innerhtml of the rainbow table, and save it to "table.html"
# then run this and save the output to the `data` variable in rainbowSearch.js

from bs4 import BeautifulSoup
import json

with open("table.html", "r") as f:
    data = f.read()

soup = BeautifulSoup(data, 'html.parser')

a_tags = soup.find_all('a')

links = [{"name": a_tag.get_text(), "href": a_tag.get('href')} for a_tag in a_tags]

json_object = json.dumps(links, indent=2)

print(json_object)
