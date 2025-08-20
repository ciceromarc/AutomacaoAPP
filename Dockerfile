FROM cypress/included:latest

COPY . .

RUN npm install
RUN apt-get update && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN service dbus start
RUN npx cypress install
RUN npm run cypress:run
RUN npm run report:allure