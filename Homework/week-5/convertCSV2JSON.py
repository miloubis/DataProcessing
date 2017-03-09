# Name: Milou Bisseling
# Studentnumber: 10427538

'''
	This program converts CSV to JSON
'''

import csv
import json
import sys

inputfile = 'NMC_5_0.csv'
outputfile = 'data.json'
fieldnames = ("countrycode", "cowcode", "year", "milex",
	"milper", "irst", "pec", "tpop", "upop", "cinc", "version")

# Open and read CSV file
csvfile = open(inputfile, 'r')
reader = csv.DictReader(csvfile, fieldnames)

# Open and write JSON file
jsonfile = open(outputfile, 'w')
data = json.dumps([row for row in reader])
jsonfile.write(data)

csvfile.close()
jsonfile.close()