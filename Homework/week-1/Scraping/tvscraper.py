#!/usr/bin/env python
# Name: Milou Bisseling
# Student number: 10427538
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):

    results = []
    for tv in dom.by_tag('div.lister-item-content'):
        tvserie =[]
        # extract title
        title = tv.by_tag('a')[0].content.encode("latin-1")       
        tvserie.append(title)
        # extract rating
        rating = tv.by_tag('strong')[0].content.encode("latin-1")
        tvserie.append(rating)
        #extract genres
        genres = tv.by_tag('span.genre')[0].content.rstrip().replace('\n','').encode("latin-1")
        tvserie.append(genres)
        
        # loop through actors
        temp = []
        for i in range (4):
            artist = tv.by_tag("p.")[2].by_tag('a')[i].content.encode("latin-1")
            temp.append(artist)
        # join the four actors in one list
        stars = ', '.join(temp).strip('[]')
        # extract artists
        tvserie.append(stars)
        # extract runtime and remove minutes from runtime
        runtime = tv.by_tag("span.runtime")[0].content[:-4].encode("latin-1")
        tvserie.append(runtime)

        results.append(tvserie)

    return results



def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    writer.writerows(tvseries)


if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)

