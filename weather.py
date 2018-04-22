import _mysql
import MySQLdb
import sys
from weather import Weather, Unit
from geopy.geocoders import Nominatim
from geopy.distance import great_circle


user = sys.argv[1]
db=MySQLdb.connect(host="shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com", user="mcheung3",passwd="shoemania", db = "shoemania")
c=db.cursor()

geolocator = Nominatim()
weather = Weather(unit=Unit.FAHRENHEIT)

#Get location of users not equal to user id
c.execute("SELECT users.id, users.location FROM users WHERE users.id !=%s",(user,))
locs = c.fetchall()

locs_form = []
for i in locs:
  locs_form.append((i[0],geolocator.geocode(i[1])))

#Get location of user

c.execute("SELECT id, location FROM users WHERE users.id ==%s",(user,))
user = c.fetchall()
user_loc = geolocator.geocode((user[0])[0])
user_strg = (user_loc[1].address.split(","))[0]+","+(user_loc[1].address.split(","))[2]
user_hum = weather.lookup_by_location(user_strg)
user_hum = user_hum.atmosphere["humidity"]
user_temp = user_loc.condition.temp 

#Calculate distance between other users and use custom weather forumla 
dist = []
for i in locs_form:
  if i[1] != "None":
  	strg = (i[1].address.split(","))[0]+","+(i[1].address.split(","))[2]
  	w = weather.lookup_by_location(strg)
  	#Get Humidity of location
  	hum = w.atmosphere["humidity"]
  	temp = w.condition.temp
  	d = great_circle(user_loc.point, i[1].point).miles 
  	hum_dist = 2*(hum-user_hum)^2
  	temp_dist = 2*(user_temp-temp)^2
    dist.append((i[0], d+hum_dist+temp_dist)


#Sort Distances
dist.sort(key=lambda x: x[1])

#Get most liked shoes from each user
shoes_list = []
for i in range(5):
  c.execute("""
      SELECT shoes.*, ratedlists.liked FROM shoes, users
	  INNER JOIN ratedlists ON users.id = ratedlists.user_id
	  WHERE users.id = %s AND users.id = ratedlists.user_id AND shoes.id = ratedlists.shoe_id
	  """, ((dist[i])[0],))
  shoe = c.fetchall()
  for j in shoe:
    shoes_list.append(j)
 
shoe = max(set(shoes_list), key=list.count)

def create_json(shoe):
	data = {
	'id' : shoe[0],
	'brand' : shoe[1],
	'photo' : shoe[2],
	'description' : shoe[3],
	'color' : shoe[4],
	'name' : shoe[5],
	'type' : shoe[6],
	'price' : shoe[7]
	}
	json_data = json.dumps(data)
	return json_data


db.close()

shoe = create_json(shoe)

print shoe



