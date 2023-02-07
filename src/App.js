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
    uid: 0,
    token:
      "007eJxTYIi+nmqRWVp77vD5iV3310wXOhjM94dNd+LMAoFDrpoTInQUGEzSjA0NjJKSzUyMDEzMLBKTTFLSLEwMzIyMjZJTEg2TMjY/SG4IZGSQ2STEwAiFID4LQ0lqcQkDAwAkBR57",
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  async function FetchToken() {
    return new Promise(function (resolve) {
      axios
        .get(`rtc/${rtcProps.channel}/1/uid/${rtcProps.uid}/?expiry=60`)
        .then((response) => {
          console.log(response.data.rtcToken);
          resolve(response.data.rtcToken);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  useEffect(() => {
    api
      .get(`/rtc/${rtcProps.channel}/1/uid/${rtcProps.uid}/?expiry=60`)
      .then((res) => {
        console.log(rtcProps);
        setRtcToken(res.data.rtcToken);
        rtcProps.channel = channelName;
        rtcProps.uid = uId;
        rtcProps.token = FetchToken();
        console.log(rtcProps);
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
