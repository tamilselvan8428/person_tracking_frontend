import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Viewer() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5005/api/rooms").then(res => setRooms(res.data));
  }, []);

  return (
    <div>
      <h2>Viewer Page - Room List</h2>
      <ul>
        {rooms.map((r, i) => (
          <li key={i}>{r.name} - {r.deviceID}</li>
        ))}
      </ul>
    </div>
  );
}
