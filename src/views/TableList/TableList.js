import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//icons
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AddIcon from '@material-ui/icons/Add';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
// core components
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import axios from 'axios'
import qs from 'qs';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();

  const [flag, setFlag] = React.useState(0);
  const [devices, setDevices] = React.useState([]);
  const [deviceComodos, setDeviceComodos] = React.useState([]);

  async function updateDevices() {
    const response = await axios.get('http://localhost:5000/auth/sendDevices');
    setDevices(response.data.devices);
    const response2 = await axios.get('http://localhost:5000/auth/sendComodos')
    setDeviceComodos(response2.data.comodos);
  }

  function iconSelector(icon){
    if(icon === "ac"){
      return(<AcUnitIcon style={{width: 170, height: 170}}/>)
    }
    else if(icon === "light"){
      return(<EmojiObjectsIcon style={{width: 170, height: 170}}/>)
    }
    else if(icon === "custom"){
      return(<DevicesOtherIcon style={{width: 170, height: 170}}/>)
    }
  }

  function colorSelector(state){
    if(state === true){
      return "success"
    }
    else{
      return ""
    }
  }

  async function setDeviceState(parameter) {
    const response = await axios.post('http://localhost:5000/auth/setDeviceState',{
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

  function filtrarComodo(device, comodo) {
    if(device.comodo === comodo){
      return(
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
          <Button onClick={() => setDeviceState(device._id)}color={colorSelector(device.flag)}style={{width: 200, height: 200, borderRadius: 20, margin: 10}}>
            {iconSelector(device.icon)}
          </Button>{device.nome}
        </div>)
    }
  }

  useEffect(() => {
    updateDevices()
  },[flag]);

  return (
    <div>
     {deviceComodos.map((comodo) => (<><h3>{comodo}</h3>
       <div style={{display: "flex",flexDirection: "row", marginBottom:10}}>
        {devices.map((device) => (
          <div>
            {filtrarComodo(device, comodo)}
          </div>
        ))}
       </div></>
     ))}
    </div>
  );
}
