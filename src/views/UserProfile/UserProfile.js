import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import axios from 'axios'
import qs from 'qs';

import avatar from "assets/img/faces/marc.jpg";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Input, MenuItem } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();

  const [openAddDevice, setOpenAddDevice] = React.useState(false);
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceType, setDeviceType] = React.useState('');
  const [devices, setDevices] = React.useState([]);


  async function updateDevices() {
    const response = await axios.get('http://localhost:5000/auth/sendDevices');
    setDevices(response.data.devices);
  }

  useEffect(() => {
    updateDevices()
    console.log(devices)
  }, [openAddDevice]);

  const hcOpenAddDevice = () => {
    setOpenAddDevice(true);
  };

  const hcCloseAddDevice = () => {
    setOpenAddDevice(false);
  };

  async function saveDevice() {
    let data = {
      deviceName: deviceName,
      deviceType: deviceType
    }
    console.log(data);
    const response = await axios.post('http://localhost:5000/auth/sendTest',{
      deviceName: deviceName,
      deviceType: deviceType
    },{
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .catch ((err) => {
      console.log (err)
      })
      .then((response) => {
        console.log(response);
      })
      setOpenAddDevice(false);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Dispositivos</h4>
            </CardHeader>
            <CardBody>
              {
                devices.map((device) => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <b>{device.nome}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      Tipo: {device.type}
                      
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))
              }
              <Button onClick={hcOpenAddDevice}>Adicionar Dispositivo</Button>
              <Dialog
                open={openAddDevice}
                onClose={hcCloseAddDevice}
              >
                <DialogTitle id="add-device">Adicionar Dispositivo</DialogTitle>
                <DialogContent>
                  <GridContainer>
                    <GridItem xs={12}>
                    <InputLabel>Nome do Dispositivo</InputLabel>
                    <TextField id="device_name" onChange={e => setDeviceName(e.target.value)}>Device Name</TextField>
                    </GridItem>
                    <GridItem xs={12}>
                      <InputLabel>Tipo</InputLabel>
                      <Select id="device_type" value={deviceType} onChange={e => setDeviceType(e.target.value)}>
                        <MenuItem value={"toggle"}>On/Off</MenuItem>
                        <MenuItem value={"slider"}>Valores</MenuItem>
                      </Select>
                    </GridItem>
                  </GridContainer>
                </DialogContent>
                <DialogActions>
                  <Button onClick={saveDevice}>Salvar</Button>
                  <Button onClick={hcCloseAddDevice}>Cancelar</Button>
                </DialogActions>
              </Dialog>
            </CardBody>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
        <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Alarmes</h4>
            </CardHeader>
            <CardBody>
              
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
