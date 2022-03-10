import bs4
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup as soup
import json
import re

import textblob

# load diseases and sydromes
disease_list = json.load(open('disease_list.json'))
syndrome_list = json.load(open('syndrome_list.json'))

my_url = 'https://www.who.int/emergencies/disease-outbreak-news'

# open a connection and grab the page
req = Request(my_url, headers={'User-Agent': 'Mozilla/5.0'})
page_html = urlopen(req).read()

# parse the html
page_soup = soup(page_html, "html.parser")

containers = page_soup.findAll("a", {"class":"sf-list-vertical__item"})

def get_data():
    id = 0
    results = []
    for container in containers:
        id += 1
        article = {}

        article['id'] = str(id)

        # go into each article
        article_link = container['href']
        article['url'] = article_link
        req = Request(article_link, headers={'User-Agent': 'Mozilla/5.0'})
        article_html = urlopen(req).read()
        article_soup = soup(article_html, "html.parser")
        
        # retrieve publication date - Date formatted as "Day Month Year" currently - can change later on if necessary
        publication_date = article_soup.find("span", {"class":"timestamp"}).text
        article['date_of_publication'] = publication_date

        # retrieve headline
        headline_div = article_soup.find("div", {"class":"sf-item-header-wrapper"})
        headline = headline_div.h1.text.strip()
        article['headline'] = headline

        # retrieve main text
        main_text = article_soup.find("article", {"class":"sf-detail-body-wrapper"}).p.text
        article['main_text'] = main_text
        
        article['reports'] = get_reports(page_soup.get_text(), disease_list, syndrome_list)

        # retrieve reports
        # return
        results.append(article)
    return results

def get_reports(text, disease_list, syndrome_list):
    reports = []
    
    date = re.findall(r'\d\d? [A-Z][a-z]+ \d\d\d\d', text)
    report = {}

    report['diseases'] = ['unknown']
    report['syndromes'] = ['unknown']

    for disease in disease_list:
        if disease['name'] in text:
            report['diseases'] = [disease['name']]
            break

    for syndrome in syndrome_list:
        if syndrome['name'] in text:
            report['syndromes'] = [syndrome['name']]
            break

    report['event_date'] = date[0]
    report['locations'] = ['United Kingdom']
    reports.append(report)
    return reports

def get_titles():
    titles = page_soup.findAll("span", {"class":"trimmed"})
    return titles

if __name__=="__main__":
    print(get_data())