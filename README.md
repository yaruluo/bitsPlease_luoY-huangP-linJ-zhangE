# Project ConCensus by Team Raduckal

Team Raduckal

SoftDev pd1

P04: Let the Data Speak

2020-05-11

### [Video Demo Here](https://www.youtube.com/watch?v=XNLCD_GOm8E)
<!-- Our site is also live [here](http://p4.jckiesd.tech). -->

# Roster
Yaru (PM)
- oversees & plans incremental project development milestones
- updates design doc and devlog
- instructions page

Jenny
- Data transfer via Jinja
- Population by county in a horizontal bar chart
- Ethnicity by state in a radially-stacked bar chart

Jackie
- Set up flask app routes & frontend framework
- Population by state in a bubble chart
- Gender ratio by state in a double bar chart

Emily
- Median income by county in a vertical bar chart
- Citizenship % p state in a pie chart
- Transitions


# Description/Summary

Our project makes use of census data compiled from 2017, sourced from Kaggle.com.
The data contains a wealth of information, from gender ratios to median income
statistics. This information will be represented in a variety of visualizations,
including bar charts, pie charts, and choropleth maps. To encourage user
interactivity, users will be able to navigate between different visualizations as
well as choose between display options.

## Instructions

### Assuming python3 and pip are already installed

### Virtual Environment

- To prevent conflicts with globally installed packages, it is recommended to run everything below in a virtual environment.

Set up a virtual environment by running the following in your terminal:

```shell
python3 -m venv hero
# replace hero with anything you want
# If the above does not work, run with python3 (this may be the case if a version of python2 is also installed)
```

To enter your virtual environment, run the following:

```shell
. hero/bin/activate
```

To exit your virtual environment, run the following:

```shell
deactivate
```

### Dependencies

Run the following line in your virtual environment

```shell
pip install -r requirements.txt
```

### Cloning

Run the following line in your terminal

```shell
git clone https://github.com/yaruluo/raduckal__yluo00-phuang00-jlin00-ezhang00
```

### Running

Run the following line in your virtual environment

```shell
cd app/
python3 __init__.py
```

Open a browser and head to <http://127.0.0.1:5000/>


