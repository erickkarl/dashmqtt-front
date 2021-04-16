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

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const[graficoEnergia, setGraficoEnergia] = useState(dailySalesChart.data)

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
              <h3 className={classes.cardTitle}>45 L</h3>
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
                <UpdateEnergia/>
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
              <p style={{ 'font-size': 20}}>Consumo de Energia</p>
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>

              <GridContainer>
                <GridItem align="right"xs={12}>
                  <ToggleButtonGroup>
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
              <p style={{ 'font-size': 20}}>Consumo de Agua</p>
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem align="right"xs={12}>
                  <ToggleButtonGroup>
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
              <p style={{ 'font-size': 20}}>Temperatura</p>
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem align="right"xs={12}>
                  <ToggleButtonGroup>
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
