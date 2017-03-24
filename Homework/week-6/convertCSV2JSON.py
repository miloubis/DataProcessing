# Name: Milou Bisseling
# Studentnumber: 10427538

'''
	This program converts CSV to JSON
'''

import csv
import json
import sys

inputfile = 'totalbirths.csv'
outputfile = 'totalbirths.json'
fieldnames = ("Perioden", "Enkelvoudige geboorten", "Tweelinggeboorten", "Drie- of meervoudige geboorten")

# Open and read CSV file
csvfile = open(inputfile, 'r')
reader = csv.DictReader(csvfile, fieldnames)

# Open and write JSON file
jsonfile = open(outputfile, 'w')
data = json.dumps([row for row in reader])
jsonfile.write(data)

csvfile.close()
jsonfile.close()