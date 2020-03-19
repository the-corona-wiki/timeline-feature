from flask import jsonify, current_app as app
import pandas as pd

@app.route('/v2/total')
def get_total_all_dates():
    def get_data(case_type):
        return f'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-{case_type}.csv'
    
    corona_confirmed = pd.read_csv(get_data('Confirmed')).drop(columns=['Lat', 'Long'])
    corona_confirmed['Case_Type'] = 'Confirmed'

    corona_deaths = pd.read_csv(get_data('Deaths')).drop(columns=['Lat', 'Long'])
    corona_deaths['Case_Type'] = 'Deaths'

    corona_recovered = pd.read_csv(get_data('Recovered')).drop(columns=['Lat', 'Long'])
    corona_recovered['Case_Type'] = 'Recovered'

    _corona = pd.concat([corona_confirmed, corona_deaths, corona_recovered])

    # DataFrame w/o groupby()
    cols = list(_corona)
    cols.insert(1, cols.pop(cols.index('Case_Type')))
    corona = _corona.loc[:, cols]

    world_group = corona.loc[:, cols].groupby(["Case_Type"]).sum()

    res = {'total': []}

    for date in world_group:
        res['total'].append({
            'date': date,
            'confirmed': int(world_group[date]['Confirmed']),
            'deaths': int(world_group[date]['Deaths']),
            'recovered': int(world_group[date]['Recovered']),
        })

    return jsonify(res)
    # return res

# print(get_total_all_dates())