import React, { useState, useEffect } from 'react';
//icons
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AddIcon from '@material-ui/icons/Add';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
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
  const [flag, setFlag] = React.useState(0);
  const [openAddDevice, setOpenAddDevice] = React.useState(false);
  const [openAddAlarm, setOpenAddAlarm] = React.useState(false);
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceType, setDeviceType] = React.useState('toggle');
  const [deviceIcon, setDeviceIcon] = React.useState('light');
  const [deviceComodo, setDeviceComodo] = React.useState('');
  const [deviceObjId, setDeviceObjId] = React.useState('');
  const [devices, setDevices] = React.useState([]);
  const [alarms, setAlarms] = React.useState([]);
  const [alarmDevice, setAlarmDevice] = React.useState('');
  const [alarmType, setAlarmType] = React.useState('time');
  const [alarmOnoff, setAlarmOnoff] = React.useState('On');
  const [alarmTime, setAlarmTime] = React.useState('00:00');
  const [alarmSensorValue, setAlarmSensorValue] = React.useState(0.0);
  const [alarmSensorRule, setAlarmSensorRule] = React.useState('igual');
  const [alarmSensor, setAlarmSensor] = React.useState('');
  const [alarmIcon, setAlarmIcon] = React.useState('')
  function iconSelector(icon){
    if(icon === "ac"){
      return(<AcUnitIcon/>)
    }
    else if(icon === "light"){
      return(<EmojiObjectsIcon/>)
    }
    else if(icon === "custom"){
      return(<DevicesOtherIcon/>)
    }
  }

  async function updateDevices() {
    const response_d = await axios.get('http://localhost:5000/auth/sendDevices');
    const response_a = await axios.get('http://localhost:5000/auth/sendAlarms');
    setDevices(response_d.data.devices);
    setAlarms(response_a.data.alarmes);
  }

  useEffect(() => {
    updateDevices()
  },[openAddDevice, openAddAlarm, flag]);

  const hcOpenAddDevice = () => {
    setOpenAddDevice(true);
  };

  const hcCloseAddDevice = () => {
    setOpenAddDevice(false);
  };

  const hcOpenAddAlarm = () => {
    setOpenAddAlarm(true);
  };

  const hcCloseAddAlarm = () => {
    setOpenAddAlarm(false);
  };

  async function saveAlarm() {
    let data = {
      alarmDevice: alarmDevice,
      alarmType: alarmType,
      alarmTime: alarmTime,
      alarmSensor: alarmSensor,
      alarmSensorRule: alarmSensorRule,
      alarmOnoff: alarmOnoff,
      alarmSensorValue: alarmSensorValue,
      alarmIcon: alarmIcon
    }
    console.log(data);
    const response = await axios.post('http://localhost:5000/auth/addAlarm',{
      alarmDevice: alarmDevice,
      alarmType: alarmType,
      alarmTime: alarmTime,
      alarmSensor: alarmSensor,
      alarmSensorRule: alarmSensorRule,
      alarmOnoff: alarmOnoff,
      alarmSensorValue: alarmSensorValue,
      alarmIcon: alarmIcon
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
      setOpenAddAlarm(false);
  }

  async function saveDevice() {
    let data = {
      alarmDevice: alarmDevice,
      deviceType: deviceType,
      deviceComodo: deviceComodo,
      deviceIcon: deviceIcon
    }
    console.log(data);
    const response = await axios.post('http://localhost:5000/auth/addDevice',{
      deviceName: deviceName,
      deviceType: deviceType,
      deviceComodo: deviceComodo,
      deviceIcon: deviceIcon
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

  async function deleteDevice(parameter) {
    const response = await axios.post('http://localhost:5000/auth/deleteDevice',{
      deviceObjId: parameter
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
      setFlag((flag) => (flag+1));
  }

  async function deleteAlarm(parameter) {
    const response = await axios.post('http://localhost:5000/auth/deleteAlarm',{
      alarmObjId: parameter
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
      setFlag((flag) => (flag+1));
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
                      {iconSelector(device.icon)}<b> {device.nome}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between"
                        }}>
                        <span><b>Comodo:</b> {device.comodo}</span>
                        <span><b>Tipo:</b> {device.type}</span>
                        <Button color="danger" onClick={() => {deleteDevice(device._id)}}>Apagar Dispositivo</Button>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))
              }
              <Button onClick={hcOpenAddDevice} style={{marginTop: 15}}><AddIcon/></Button>
              <Dialog
                open={openAddDevice}
                onClose={hcCloseAddDevice}
              >
                <DialogTitle id="add-device">Adicionar Dispositivo</DialogTitle>
                <DialogContent>
                  <InputLabel>Nome do Dispositivo</InputLabel>
                  <TextField id="device_name" style={{marginBottom: 25}} onChange={e => setDeviceName(e.target.value)}>Nome do Dispositivo</TextField>
                  <InputLabel>Tipo</InputLabel>
                  <Select id="device_type" style={{marginBottom: 25}} value={deviceType} onChange={e => setDeviceType(e.target.value)}>
                    <MenuItem value={"toggle"}>On/Off</MenuItem>
                    <MenuItem value={"slider"}>Valores</MenuItem>
                  </Select>
                  <InputLabel>Comodo</InputLabel>
                  <TextField id="device_name" style={{marginBottom: 25}} onChange={e => setDeviceComodo(e.target.value)}>Comodo</TextField>
                  <InputLabel>Ícone</InputLabel>
                  <Select id="device_icon" style={{marginBottom: 25}} value={deviceIcon} onChange={e => setDeviceIcon(e.target.value)}>
                    <MenuItem value={"light"}><EmojiObjectsIcon/></MenuItem>
                    <MenuItem value={"ac"}><AcUnitIcon/></MenuItem>
                    <MenuItem value={"custom"}><DevicesOtherIcon/></MenuItem>
                  </Select>
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
            {
                alarms.map((alarm) => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary

                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      {iconSelector(alarm.icon)}<b> {alarm.dispositivo}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between"
                        }}>
                        <span><b>Tipo:</b> {alarm.type}</span>
                        <span><b>Comando:</b> {alarm.onoff}</span>
                        {
                          (alarm.type === "time")?
                          (
                            <>
                              <span><b>Horário:</b>{alarm.tempo}</span>
                            </>
                          ):
                          (
                            <>
                              <span><b>Sensor:</b>{alarm.sensor}</span>
                              <span><b>Regra:</b>{alarm.regra}</span>
                              <span><b>Valor:</b>{alarm.sensor_value}</span>
                            </>
                          )
                        }
                        <Button color="danger" onClick={() => {deleteAlarm(alarm._id)}}>Apagar Dispositivo</Button>
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))
              }
              <Button onClick={hcOpenAddAlarm} style={{marginTop: 15}}><AddIcon/></Button>
              <Dialog
                open={openAddAlarm}
                onClose={hcCloseAddAlarm}
              >
                <DialogTitle id="add-alarm">Adicionar Alarme</DialogTitle>
                <DialogContent>
                  <InputLabel>Dispositivo</InputLabel>
                  <Select id="Alarm_device" style={{marginBottom: 25}} value={alarmDevice} onChange={e => setAlarmDevice(e.target.value)}>
                    {
                      devices.map((device) => (
                        <MenuItem value={device.nome}>{iconSelector(device.icon)}{device.nome}</MenuItem>
                      ))
                    }
                  </Select>
                  <InputLabel>Tipo</InputLabel>
                  <Select id="Alarm_type" style={{marginBottom: 25}} value={alarmType} onChange={e => setAlarmType(e.target.value)}>
                    <MenuItem value={"time"}>Horario</MenuItem>
                    <MenuItem value={"sensor"}>Sensor</MenuItem>
                  </Select>
                  <InputLabel>Comando</InputLabel>
                  <Select id="Alarm_onoff" style={{marginBottom: 25}} value={alarmOnoff} onChange={e => setAlarmOnoff(e.target.value)}>
                    <MenuItem value={"on"}>Ligar</MenuItem>
                    <MenuItem value={"off"}>Desligar</MenuItem>
                  </Select>
                  {
                    (alarmType === 'time')?
                    (<div>
                      <InputLabel>Horario</InputLabel>
                      <TextField id="alarm_time" style={{marginBottom: 25}} onChange={e => setAlarmTime(e.target.value)}>Hora do Disparo</TextField>
                    </div>):
                    (
                    <div>
                      <InputLabel>Sensor</InputLabel>
                      <Select id="Alarm_sensor" style={{marginBottom: 25}} value={alarmSensor} onChange={e => setAlarmSensor(e.target.value)}>
                        <MenuItem value={"temperatura"}>Temperatura</MenuItem>
                        <MenuItem value={"vazao"}>Vazão</MenuItem>
                        <MenuItem value={"potencia"}>Potência</MenuItem>
                      </Select>
                      <InputLabel>Regra de Disparo</InputLabel>
                      <Select id="Alarm_rule" style={{marginBottom: 25}} value={alarmSensorRule} onChange={e => setAlarmSensorRule(e.target.value)}>
                        <MenuItem value={"maior"}>Maior</MenuItem>
                        <MenuItem value={"menor"}>Menor</MenuItem>
                        <MenuItem value={"igual"}>Igual</MenuItem>
                      </Select>
                      <InputLabel>Valor do Sensor</InputLabel>
                      <TextField id="alarm_sensor_value" style={{marginBottom: 25}} onChange={e => setAlarmSensorValue(e.target.value)}>Valor de Disparo</TextField>
                    </div>)
                  }
                </DialogContent>
                <DialogActions>
                  <Button onClick={saveAlarm}>Salvar</Button>
                  <Button onClick={hcCloseAddAlarm}>Cancelar</Button>
                </DialogActions>
              </Dialog>
            </CardBody>

          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
