# Name: Milou Bisseling
# Studentnumber: 10427538

'''
	This program converts CSV to JSON
'''

import csv
import json
import sys

inputfile = 'data/womeninparliaments.csv'
outputfile = 'womeninparliament.json'
fieldnames = ("countryid", "name", "1997", "1998",
	"1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", 
	"2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016")

# Open and read CSV file
csvfile = open(inputfile, 'r')
reader = csv.DictReader(csvfile, fieldnames)

# Open and write JSON file
jsonfile = open(outputfile, 'w')
data = json.dumps([row for row in reader])
jsonfile.write(data)

csvfile.close()
jsonfile.close()