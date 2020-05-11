import csv

DATA = 'data/2017data.csv'

ABBREV = {'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
          'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
          'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
          'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
          'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
          'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
          'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
          'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
          'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
          'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
          'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI',
          'Wyoming': 'WY'}

def get_data_by_state():
    '''returns all the data needed for the population, ethnicity, gender ratio,
       and voting citizen by state charts'''
    data = []
    with open(DATA) as csv_file:
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
                             'voting': voting, 'nonvoting': pop - voting, 'abbrev': ABBREV[state]})
                state = ""
                pop = men = women = voting = 0
    return data

def get_ethnicity_by_state():
    '''returns all the data needed for the ethnicity by state charts'''
    data = []
    with open(DATA) as csv_file:
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
                             'pacific': int(pacific), 'total': total, 'abbrev': ABBREV[state]})
                state = ""
                total = hispanic = white = black = native = asian = pacific = 0
    return data

def get_gender_by_state():
    '''returns all the data needed for the gender ratio by state charts'''
    data = []
    with open(DATA) as csv_file:
        state = ""
        male = female = total = 0
        reader = csv.DictReader(csv_file)
        for row in reader:
            if (row['State'] != "DC" and row['State'] != "Puerto Rico" and
                    (state == "" or state == row['State'])):
                temp_pop = int(row['TotalPop'])
                state = row['State']
                total += temp_pop
                male += float(row['Men'])
                female += float(row['Women'])
            elif state != "":
                data.append({'state': state, 'male': int(male), 'female': int(female),
                             'mratio': float(male) / total, 'fratio': float(female) / total, 'total': total, 'abbrev': ABBREV[state]})
                state = ""
                total = female = male = 0
    return data

def get_voting_by_state(state):
    data = []
    with open(DATA) as csv_file:
        population = 0
        voting = 0
        reader = csv.DictReader(csv_file)
        for row in reader:
            if (row['State'] == state):
                voting = int(row['VotingAgeCitizen'])
                population = int(row['TotalPop'])
        data.append({'name': 'Voting', 'value': voting})
        data.append({'name': 'Nonvoting', 'value': population - voting})
    return data



def get_data_by_county(state):
    '''returns all the data needed for the population and median income by county
       charts for the given state'''
    data = []
    with open(DATA) as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            if state == row['State']:
                data.append({'county': row['County'], 'pop': row['TotalPop'],
                             'income': row['Income']})
    return data

def get_states():
    return list(ABBREV.keys())

# print(get_data_by_state())
# print(get_data_by_county('New York'));
