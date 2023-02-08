import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import axios from "axios";
import styled from "styled-components";
import "../App.css";
import useNavigate from "../hooks/useNavigate";

const api = axios.create({
  baseURL: "/api",
});

const Home = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [rtcProps, setRtcProps] = useState({
    appId: "4f3102bc6420468ab4df8406232cda1b",
    channel: "", // your agora channel
    token: "",
  });
  const { goTest } = useNavigate();
  const changeChannel = (e) => {
    setRtcProps({ ...rtcProps, channel: e.target.value });
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  const showVideo = async () => {
    api.get(`/rtc/${rtcProps.channel}/1/uid/0/?expiry=3600`).then((res) => {
      console.log(
        "--------------------------------------------------------------"
      );
      console.log(res);
      console.log(
        "--------------------------------------------------------------"
      );
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
  const test = () => {
    window.open("https://www.naver.com");
  };
  return videoCall ? (
    <>
      <Button onClick={test}>새로운 페이지 열기</Button>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      </div>
    </>
  ) : (
    <>
      <Start style={{ marginTop: "20px" }}> Agorara </Start>
      <Box>
        <Input type="text" onChange={(e) => changeChannel(e)} />
        <Start
          onClick={() => {
            showVideo();
          }}
        >
          Start Call
        </Start>
      </Box>

      <Button onClick={goTest}>테스트 페이지로 넘어가기</Button>
    </>
  );
};

export default Home;

const Button = styled.button`
  width: 100%;
`;

const Box = styled.div`
  margin-top: 15%;
  text-align: center;
  border: solid 1px gray;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
`;

const Input = styled.input`
  border: solid 1px red !important;
  margin-bottom: 20px;
  text-align: center;
  height: 46px;
  width: 300px;
`;

const Start = styled.div`
  font: normal normal 700 20pt Pretendard;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;
