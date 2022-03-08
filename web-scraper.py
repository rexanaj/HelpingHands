import bs4
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup as soup

my_url = 'https://www.who.int/emergencies/disease-outbreak-news'

# open a connection and grab the page
req = Request(my_url, headers={'User-Agent': 'Mozilla/5.0'})
page_html = urlopen(req).read()

# parse the html
page_soup = soup(page_html, "html.parser")

# TODO:find a class to grab the disease info
titles = page_soup.findAll("span", {"class":"trimmed"})
print(titles)
