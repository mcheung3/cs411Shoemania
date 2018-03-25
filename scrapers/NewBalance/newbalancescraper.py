import requests
from bs4 import BeautifulSoup
import re
import csv

def main():
	# url
	#'http://www.newbalance.com/men-1/?prefn1=productClass&prefv1=Shoes'
	shoe_cats = {
		'running': 'http://www.newbalance.com/men/shoes/all-shoes/running/?prefn1=productClass&prefv1=Shoes',
		'lifestyle': 'http://www.newbalance.com/men/shoes/all-shoes/lifestyle/?prefn1=productClass&prefv1=Shoes',
		'training': 'http://www.newbalance.com/men/shoes/all-shoes/training/?prefn1=productClass&prefv1=Shoes',
		'walking': 'http://www.newbalance.com/men/shoes/all-shoes/walking/?prefn1=productClass&prefv1=Shoes'
	}

	for cat, shoe_page in shoe_cats.items():
		page = requests.get(shoe_page)
		soup = BeautifulSoup(page.content, 'html.parser')
		filename = 'newbalance_' + cat + '.csv'

		for shoe in soup.find_all('li', class_='tile'):
			shoe_info = get_shoe_data(shoe, cat)
			if not shoe_info:
				continue
			# open a csv file with append, so old data will not be erased
			with open(filename, 'a') as csv_file:
 				writer = csv.writer(csv_file)
 				writer.writerow([shoe_info[i] for i in range(len(shoe_info))])


def get_shoe_data(shoe, cat):
	brand = 'New Balance'
	colors = get_colors(shoe)
	name = get_name(shoe)
	price = get_price(shoe)

	link = shoe.find('div', class_='product')
	link = link.get('data-quickview-url')
	if not link:
		return
	page = requests.get(link)
	soup = BeautifulSoup(page.content, 'html.parser')

	description = get_product_description(soup)
	photo = get_photo_url(soup)
	return brand, cat, photo, description, colors, name, price

def get_colors(shoe):
	colors = shoe['data-product-hit']
	colors = colors.split(':')
	colors = colors[1].split(',')
	colors = [re.sub(r'\W+', '', color) for color in colors]
	return colors

def get_name(shoe):
	name = shoe.find('p', class_='product-name')
	name = name.find('a')
	name = name.get('title')
	return name

def get_price(shoe):
	price = shoe.find('div', class_='product-pricing')
	price = ' '.join(price.get_text().split())
	return price

def get_product_description(soup):
	details = soup.find('section', class_='product-details')
	description = details.find('div', class_='longdescription')
	description = description.get_text()
	return description

def get_photo_url(soup):
	img = soup.find('div', class_='gallery-placeholder')
	url = img.find('img').get('src')
	return url

if __name__ == '__main__':
	main()