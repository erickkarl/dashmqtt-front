import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ContactlessOutlined } from "@material-ui/icons";

export default function UpdateEnergia() {
  const [energia, setEnergia] = useState(10);
  async function updateDb() {
    const response = await axios.get('http://localhost:5000/auth/sendEnergy');
    setEnergia(response.data.user.value);
    console.log('jota');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateDb()
    }, 1000);
    return () => clearInterval(interval);
  }, [energia]);
    return (
        <div>
            {energia} C
        </div>
    )
}
