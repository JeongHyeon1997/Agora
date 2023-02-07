import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [rtcProps, setRtcProps] = useState({
    appId: "4f3102bc6420468ab4df8406232cda1b",
    channel: "", // your agora channel
    token: "",
  });

  const changeChannel = (e) => {
    setRtcProps({ ...rtcProps, channel: e.target.value });
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  const showVideo = async () => {
    api.get(`/rtc/${rtcProps.channel}/1/uid/0/?expiry=60`).then((res) => {
      setRtcProps({ ...rtcProps, token: res.data.rtcToken });
      setVideoCall(true);
    });
  };

  useEffect(() => {
    console.log(
      "--------------------------------------------------------------"
    );
    console.log(rtcProps);
    console.log(
      "--------------------------------------------------------------"
    );
  }, [rtcProps]);

  return videoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <>
      <input onChange={(e) => changeChannel(e)} />
      <h3
        onClick={() => {
          showVideo();
        }}
      >
        Start Call
      </h3>
    </>
  );
};

export default App;
