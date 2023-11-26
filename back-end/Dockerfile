FROM python:3.11

# Install poetry
ENV POETRY_VERSION 1.4.2
RUN pip install "poetry==$POETRY_VERSION"
RUN poetry config virtualenvs.create false

# Install dependencies
COPY . .
RUN poetry install --no-root

# Create database with tables
WORKDIR /api
RUN python manage.py makemigrations cats \
    && python manage.py migrate

# Create temporary superuser
RUN python manage.py initialize_admin

EXPOSE 8000