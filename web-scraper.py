import bs4
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

my_url = 'https://www.who.int/emergencies/disease-outbreak-news'

# open a connection and grab the page
uClient = uReq(my_url)
page_html = uClient.read()
uClient.close()

# parse the html
page_soup = soup(page_html, "html.parser")

# TODO:find a class to grab the disease info
containers = page_soup.findAll("div", {"class":"lister-item-content"})
