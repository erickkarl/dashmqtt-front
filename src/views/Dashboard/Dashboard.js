//mudar o botao do grafico para mostrar qual esta selecionado
import React, { useState } from "react";
import axios from "axios";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import red from '@material-ui/core/colors/red'
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import FlashOn from "@material-ui/icons/FlashOn";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Bathtub from "@material-ui/icons/Bathtub"
// core components
import Text from 'react'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Chip from '@material-ui/core/Chip';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { bugs, website, server } from "variables/general.js";
import UpdateEnergia from "components/updateEnergia";
import UpdateTemperatura from "components/updateTemperatura";
import UpdateAgua from "components/updateAgua";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
var Chartist = require("chartist");
var delays = 80,
durations = 500;
var delays2 = 80,
durations2 = 500;

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const[tipoEnergia, setTipoEnergia] = useState('diario');
  const[tipoAgua, setTipoAgua] = useState('diario');
  const[tipoTemperatura, setTipoTemperatura] = useState('diario');
  const[graphEnergiaD, setGraphEnergiaD] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0],
    series: [[688,688,688,688,688,3103,516,458,229,252,252,240,504,401,367,286,263,408,3500,0,0,0,0,0]]
  });
  const[graphEnergiaS, setGraphEnergiaS] = useState({
    labels: [ "S","T", "Q", "Q", "S", "S", "D"],
    series: [[15,0,0,0,0,0,0]]
  });
  const[graphEnergiaM, setGraphEnergiaM] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    series: [[21,20,20,21,17,22,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  });
  const[graphTemperaturaD, setGraphTemperaturaD] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0],
    series: [[21,21,21,20,21,24,26,27,27,27,28,28,27,26,27,26,24,25,24,0,0,0,0,0]]
  });
  const[graphTemperaturaS, setGraphTemperaturaS] = useState({
    labels: [ "S","T", "Q", "Q", "S", "S", "D"],
    series: [[25,0,0,0,0,0,0]]
  });
  const[graphTemperaturaM, setGraphTemperaturaM] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    series: [[26,26,25,26,25,25,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  });
  const[graphAguaD, setGraphAguaD] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0],
    series: [[0,6,0,0,0,0,182,0,0,0,0,5,4,0,0,0,0,5,212,0,0,0,0,0]]
  });
  const[graphAguaS, setGraphAguaS] = useState({
    labels: [ "S","T", "Q", "Q", "S", "S", "D"],
    series: [[420,0,0,0,0,0,0]]
  });
  const[graphAguaM, setGraphAguaM] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    series: [[411,390,379,410,265,490,420,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
  });
  const[configGraphs, setConfigGraphs] = useState({
    // for animation
    animation: {
      draw: function(data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease"
            }
          });
        }
      }
    }
  });

  const chooseTemperatura = (tipo) => {
    var labels = [];
    var series = [];
    if(tipo === 'diario'){
      labels= [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];
      series= [[21,21,21,20,21,24,26,27,27,27,28,28,27,26,27,26,24,25,24]];
    }
    else if(tipo === 'semanal'){
      labels= [ "S","T", "Q", "Q", "S", "S", "D"];
      series= [[25]];
    }
    else{
      labels= [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      series= [[26,26,25,26,25,25,25]];
    }
    return({
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: Math.max(series)*1.2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      data: {
        labels:labels,
        series:series
      }
    })
  }

  const chooseEnergia = (tipo) => {
    var labels = [];
    var series = [];
    if(tipo === 'diario'){
      labels = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];
      series = [[688,688,688,688,688,3103,516,458,229,252,252,240,504,401,367,286,263,408,3500]];
    }
    else if(tipo === 'semanal'){
      labels = [ "S","T", "Q", "Q", "S", "S", "D"];
      series = [[15]];
    }
    else{
      labels = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      series = [[21,20,20,21,17,22,15]];
    }
    return({
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: Math.max(series)*1.2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      data: {
        labels:labels,
        series:series
      }
    })
  }

  const chooseAgua = (tipo) => {
    var labels = [];
    var series = [];
    if(tipo === 'diario'){
      labels=[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];
      series=[[0,6,0,0,0,0,182,0,0,0,0,5,4,0,0,0,0,5,212]];
    }
    else if(tipo === 'semanal'){
      labels=[ "S","T", "Q", "Q", "S", "S", "D"];
      series=[[420]];
    }
    else{
      labels=[1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      series= [[411,390,379,410,265,490,420]];
    }
    return({
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: Math.max(series)*1.2, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      data: {
        labels:labels,
        series:series
      }
    })
  }

  const handleTipoEnergia = (newTipoEnergia) => {
    setTipoEnergia(newTipoEnergia);
  }

  const handleTipoTemperatura = (newTipoTemperatura) => {
    setTipoTemperatura(newTipoTemperatura);
  }

  const handleTipoAgua = (newTipoAgua) => {
    setTipoAgua(newTipoAgua);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <FlashOn />
              </CardIcon>
              <p className={classes.cardCategory}>Energia</p>
                <h3 className={classes.cardTitle}>
                  <UpdateEnergia/>
                </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Bathtub />
              </CardIcon>
              <p className={classes.cardCategory}>Água</p>
              <h3 className={classes.cardTitle}>
                <UpdateAgua/>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <FlashOn />
              </CardIcon>
              <p className={classes.cardCategory}>Temperatura</p>
              <h3 className={classes.cardTitle}>
                <UpdateTemperatura/>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
      <GridContainer>
        {/*Grafico de consumo de energia*/}
        <GridItem xs={12} sm={12} md={4} align='center'>
          <Card chart>
            <CardHeader color="success">
              <p style={{ 'fontSize': 20}}>Consumo de Energia</p>
              <ChartistGraph
                className="ct-chart"
                data={chooseEnergia(tipoEnergia).data}
                type="Line"
                options={chooseEnergia(tipoEnergia).data}
                listener={configGraphs.animation}
              />
            </CardHeader>
            <CardBody>

              <GridContainer>
                <GridItem align="right"xs={12}>
                  <ToggleButtonGroup value ={tipoEnergia} onChange={e => handleTipoEnergia(e.target.value)}>
                    <ToggleButton value='diario'>
                      Diario
                    </ToggleButton>
                    <ToggleButton value='semanal'>
                      Semanal
                    </ToggleButton>
                    <ToggleButton value='mensal'>
                      Mensal
                    </ToggleButton>
                  </ToggleButtonGroup>
                </GridItem>
              </GridContainer>
            </CardBody>
            
          </Card>
        </GridItem>
        {/*Grafico consumo de agua*/}
        <GridItem xs={12} sm={12} md={4} align='center'>
          <Card chart>
            <CardHeader color="info">
              <p style={{ 'fontSize': 20}}>Consumo de Agua</p>
              <ChartistGraph
                className="ct-chart"
                data={chooseAgua(tipoAgua).data}
                type="Line"
                options={chooseAgua(tipoAgua).options}
                listener={configGraphs.animation}
              />
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem align="right"xs={12}>
                  <ToggleButtonGroup value ={tipoAgua} onChange={e => handleTipoAgua(e.target.value)}>
                    <ToggleButton value='diario'>
                      Diario
                    </ToggleButton>
                    <ToggleButton value='semanal'>
                      Semanal
                    </ToggleButton>
                    <ToggleButton value='mensal'>
                      Mensal
                    </ToggleButton>
                  </ToggleButtonGroup>
                </GridItem>
              </GridContainer>
            </CardBody>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} align='center'>
          <Card chart>
            <CardHeader color="danger">
              <p style={{ 'fontSize': 20}}>Temperatura</p>
              <ChartistGraph
                className="ct-chart"
                data={chooseTemperatura(tipoTemperatura).data}
                type="Line"
                options={chooseTemperatura(tipoTemperatura).options}
                listener={configGraphs.animation}
              />
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem align="right"xs={12}>
                  <ToggleButtonGroup value ={tipoTemperatura} onChange={e => handleTipoTemperatura(e.target.value)}>
                    <ToggleButton value='diario'>
                      Diario
                    </ToggleButton>
                    <ToggleButton value='semanal'>
                      Semanal
                    </ToggleButton>
                    <ToggleButton value='mensal'>
                      Mensal
                    </ToggleButton>
                  </ToggleButtonGroup>
                </GridItem>
              </GridContainer>
              
            </CardBody>
            
          </Card>
        </GridItem>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Notificacoes</h4>
            </CardHeader>
            <CardBody>
              <Table
                // tableHeaderColor="warning"
                // tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["Consumo de água aumentou em 10% em relação à semana passada"],
                  ["A temperatura está alta hoje, deseja ligar o ar?"]

                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
