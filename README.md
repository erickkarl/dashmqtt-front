# [HomeBoard (using material dashboard)](https://demos.creative-tim.com/material-dashboard-react/#/dashboard) 

![version](https://img.shields.io/badge/version-1.9.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

![Product Gif](src/assets/github/indexpage.gif)

## Introduction
 This is HomeBoard, a brand new Dashboard with Home Automation Features including:
 * Real-time sensor data visualization.
 * Historic view of data from sensors.
 * Turning on/off devices from home via buttons or automated routines.
 * Browser and mobile compatibility!

 It uses MQTT protocol to communicate with a wi-fi microcontroller, and updates values in realtime on a MongoDB database using ![this API](https://github.com/erickkarl/dashmqtt-back)

 ## Showoff

 Here are the views of some features in HomeBoard:
* Mobile screen view with drawer menu:
![Mobile Gif](src/assets/github/drawer.gif)

* Turning on/off devices from home:
![Onoff](src/assets/github/buttons.gif)

* Device menu:
![Devices](src/assets/github/dropdown.gif)

* Adding new devices and alarms:
![Deleteadd](src/assets/github/deleteadd.gif)

* Database entries:
![DB](src/assets/github/database.jpg)

## Todo
* Upgrade historic views to be more responsive and cleaner.
* Add slider control for devices that can assume multiple values (not only toggle).
* Bug fixes to month/week/daily views on charts.