import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [uId, setuId] = useState(0);

  const uidUp = () => {
    setuId(uId + 1);
    console.log(uId);
  };

  const changeChannel = (e) => {
    setChannelName(e.target.value);
  };

  let rtcProps = {
    appId: "4f3102bc6420468ab4df8406232cda1b",
    channel: "test", // your agora channel
    token:
      "007eJxTYNiy6avDmpeHwyZueHix7U2d2owrvA/6bua5GkS9NTaJ/1OvwGCSZmxoYJSUbGZiZGBiZpGYZJKSZmFiYGZkbJSckmiYxLH5YXJDICNDwDprBkYoBPFZGEpSi0sYGAA5GCHa",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  useEffect(() => {
    rtcProps.channel = channelName;
    api.get(`/rtc/${rtcProps.channel}/1/uid/0/?expiry=60`).then((res) => {
      rtcProps.token = res.data.rtcToken;
    });
  }, [videoCall]);

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <>
      <input onChange={changeChannel} />
      <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
      <button onClick={uidUp} />
    </>
  );
};

export default App;
