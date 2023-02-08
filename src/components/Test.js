import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useNavigate from "../hooks/useNavigate";

const Test = () => {
  const { goHome } = useNavigate();
  const [play, setPlay] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    startVideo();
  }, []);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (!play) {
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
      }
      setPlay(true);
    }
  };
  return (
    <>
      <Body>
        <Start>여기는 내장 카메라로 띄운 화면 입니당</Start>
        <Advertising> 무려 광고 영역 ? </Advertising>
        <video autoPlay ref={videoRef} className="videoSection" width={"50%"} />
        <Advertising> 무려 광고 영역 ? </Advertising>
      </Body>
      <Button onClick={goHome}>홈으로 돌아가기</Button>
    </>
  );
};

export default Test;

const Button = styled.button`
  width: 100%;
`;

const Body = styled.div`
  text-align: center;
`;

const Start = styled.div`
  font: normal normal 700 20pt Pretendard;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20pt;
`;

const Advertising = styled.div`
  display: inline-block;
  text-align: center;
  border: solid 5px red;
  width: 23%;
`;
