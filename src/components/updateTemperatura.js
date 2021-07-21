import React, { useEffect, useState } from "react";
import axios from 'axios'
import { ContactlessOutlined } from "@material-ui/icons";

export default function UpdateTemperatura() {
  const [temperatura, setTemperatura] = useState(10);
  async function updateDb() {
    const response = await axios.get('http://localhost:5000/auth/sendTemperature');
    setTemperatura(response.data.user.value);
    console.log('jota');
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateDb()
    }, 1000);
    return () => clearInterval(interval);
  }, [temperatura]);
    return (
        <div>
            {temperatura} C
        </div>
    )
}
