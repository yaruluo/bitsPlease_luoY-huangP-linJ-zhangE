import csv


def get_data_by_state():
    '''returns all the data needed for the population, ethnicity, gender ratio,
       and voting citizen by state charts'''
    data = []
    with open('data/2017data.csv') as csv_file:
        state = ""
        pop = men = women = voting = 0
        reader = csv.DictReader(csv_file)
        for row in reader:
            if (row['State'] != "DC" and row['State'] != "Puerto Rico" and
                    (state == "" or state == row['State'])):
                temp_pop = int(row['TotalPop'])
                state = row['State']
                pop += temp_pop
                men += int(row['Men'])
                women += int(row['Women'])
                voting += int(row['VotingAgeCitizen'])
            elif state != "":
                data.append({'state': state, 'pop': pop, 'men': men, 'women': women,
                             'voting': voting, 'nonvoting': pop - voting})
                state = ""
                pop = men = women = voting = 0
    return data

def get_ethnicity_by_state():
    '''returns all the data needed for the population, ethnicity, gender ratio,
       and voting citizen by state charts'''
    data = []
    with open('data/2017data.csv') as csv_file:
        state = ""
        hispanic = white = black = native = asian = pacific = total = 0
        reader = csv.DictReader(csv_file)
        for row in reader:
            if (row['State'] != "DC" and row['State'] != "Puerto Rico" and
                    (state == "" or state == row['State'])):
                temp_pop = int(row['TotalPop'])
                state = row['State']
                total += temp_pop
                hispanic += float(row['Hispanic']) * temp_pop / 100
                white += float(row['White']) * temp_pop / 100
                black += float(row['Black']) * temp_pop / 100
                native += float(row['Native']) * temp_pop / 100
                asian += float(row['Asian']) * temp_pop / 100
                pacific += float(row['Pacific']) * temp_pop / 100
            elif state != "":
                data.append({'state': state, 'hispanic': int(hispanic), 'white': int(white),
                             'black': int(black), 'native': int(native), 'asian': int(asian),
                             'pacific': int(pacific), 'total': total})
                state = ""
                total = hispanic = white = black = native = asian = pacific = 0
    return data


def get_data_by_county(state):
    '''returns all the data needed for the population and median income by county
       charts for the given state'''
    data = []
    with open('data/2017data.csv') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            if state == row['State']:
                data.append({'county': row['County'], 'pop': row['TotalPop'],
                             'income': row['Income']})
    return data

# print(get_data_by_state())
# print(get_data_by_county('New York'));
