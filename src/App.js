import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [rtcToken, setRtcToken] = useState("");

  const changeChannel = (e) => {
    setChannelName(e.target.value);
  };

  let rtcProps = {
    appId: "4f3102bc6420468ab4df8406232cda1b",
    channel: channelName, // your agora channel
    token:
      "007eJxTYIi+nmqRWVp77vD5iV3310wXOhjM94dNd+LMAoFDrpoTInQUGEzSjA0NjJKSzUyMDEzMLBKTTFLSLEwMzIyMjZJTEg2TMjY/SG4IZGSQ2STEwAiFID4LQ0lqcQkDAwAkBR57",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  useEffect(() => {
    api.get("/rtc/test/1/uid/1/?expiry=60").then((res) => {
      setRtcToken(res.data.rtcToken);
      console.log(res);
      console.log(res.data.rtcToken);
    });
  }, [rtcToken]);

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <>
      <input onChange={changeChannel} />
      <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
    </>
  );
};

export default App;
