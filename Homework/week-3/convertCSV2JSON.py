# Name: Milou Bisseling
# Studentnumber: 10427538
'''
	This program converts CSV to JSON
'''

import csv
import json

inputfile = 'data.csv'
outputfile = 'data.json'
fieldnames = ("Jaar","Aantal_meerlingen")

csvfile = open(inputfile, 'r')
jsonfile = open(outputfile, 'w')

reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')

csvfile.close()
jsonfile.close()