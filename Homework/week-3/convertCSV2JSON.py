# Name: Milou Bisseling
# Studentnumber: 10427538
'''
	This program converts CSV to JSON
'''

import csv
import json

inputfile = 'data.csv'
outputfile = 'data.json'
fieldnames = ("Jaar", "Aantal_meerlingen")

csvfile = open(inputfile, 'r')
reader = csv.DictReader(csvfile, fieldnames)

jsonfile = open(outputfile, 'w')
data = json.dumps([row for row in reader])
jsonfile.write(data)

csvfile.close()
jsonfile.close()