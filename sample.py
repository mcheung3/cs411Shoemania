import requests
from bs4 import BeautifulSoup
from urllib import urlretrieve
import urlparse
from bs4 import BeautifulSoup
import urllib2
import re
import os

url_main = "https://store.nike.com/us/en_us/pw/mens-shoes/7puZoi3"
page = requests.get(url_main)
soup = BeautifulSoup(page.content, 'html.parser')
shoes = soup.find(id="exp-gridwall-wrapper")
wall2 = shoes.find("div", class_="exp-gridwall")
to_be_urls = wall2.find_all("div", class_="grid-item fullSize")
url_list = []
#This gets the urls from a page that displays many shoes
for i in to_be_urls:
	temp = i.a
	url_list.append(temp['href'])


#This gets each shoes data; creates a folder, and stores the picture and other information there
for url in url_list:
	print(url)
	page = requests.get(url)
	soup = BeautifulSoup(page.content, 'html.parser')
	shoe = soup.find(id="react-root")
	h2 = shoe.h2.text
	ll = h2.split("$")
	shoe_type = ll[0]
	shoe_price = int(ll[1])
	shoe_name = shoe.h1.text
	ll2 = shoe.find("div", class_="description-preview").text
	ll2 = ll2.split("Shown: ")
	shoe_desciption = ll2[0]
	shoe_color_shown = ((ll2[1]).split("Style"))[0]
	shoe_brand = "Nike"
	path = "webscrapping_cs411/"
	dir_title = re.sub("\s", "_", shoe_name)
	call = "mkdir "+path+dir_title
	os.system(call)
	imgs = soup.select('img')
	img = imgs[1]
	img_url = urlparse.urljoin(url, img['src'])
	file_name = img['src'].split('/')[-1]
	urlretrieve(img_url, (path+dir_title+"/"+file_name))
	text_file = open((path+dir_title+"/"+"cost.txt"), "w")
	text_file.write(str(shoe_price))
	text_file.close()	
	text_file = open((path+dir_title+"/"+"name.txt"), "w")
	text_file.write(shoe_name)
	text_file.close()
	text_file = open((path+dir_title+"/"+"type.txt"), "w")
	text_file.write(shoe_type)
	text_file.close()	
	text_file = open((path+dir_title+"/"+"descrp.txt"), "w")
	text_file.write(((shoe_desciption).encode('ascii', 'ignore')))
	text_file.close()
	text_file = open((path+dir_title+"/"+"color.txt"), "w")
	text_file.write(shoe_color_shown)
	text_file.close()	
	text_file = open((path+dir_title+"/"+"brand.txt"), "w")
	text_file.write(shoe_brand)
	text_file.close()	


	




