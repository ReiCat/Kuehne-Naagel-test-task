# Kuehne-Naagel-test-task

## Steps to run locally

### Create virtual environment for the project

`$ virtualenv -p python3 venv`

### Activate it

`$ source venv/bin/activate`

### Install all the requirements

`$ pip install -r requirements.txt`

### Apply migrations

`$ python manage.py migrate`

### Run tests

`$ python manage.py test`

### Run the server

`$ python manage.py runserver`
