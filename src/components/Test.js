import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { channelState } from "../atomState";
import useNavigate from "../hooks/useNavigate";

const Test = () => {
  const { goHome } = useNavigate();
  const [videoPlay, setVideoPlay] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);

  const [channel, setChannel] = useRecoilState(channelState);
  // Get 방식 + 5자리 랜덤 숫자
  const [linkUrl, setLinkUrl] = useState(
    "?" + Math.floor(Math.random() * 100000)
  );
  const [linkCheck, setLinkCheck] = useState(false);
  const Ref = useRef();
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  console.log();

  useEffect(() => {
    startVideo();
    startAudio();
  }, []);

  useEffect(() => {
    console.log(linkUrl);
    if (location.search !== "") {
      // Get 방식 ? 제거
      setChannel(location.search.replace("?", ""));
      console.log("링크 타고 들어왔을 때 !!");
    } else {
      setChannel(linkUrl.replace("?", ""));
      console.log("내가 링크 생성했을 때 !!");
    }
  }, [location, linkUrl]);

  // 카메라 On / Off
  const startVideo = async () => {
    const video = document.querySelector("video");
    // 카메라 권한
    const stream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((res) => {
        console.log(res);
        if (!videoPlay) {
          setVideoPlay(true);
          video.srcObject = res;
          video.onloadedmetadata = () => {
            video.play();
          };
          // 카메라 재생
          // Ref.current.srcObject = stream;
        } else if (videoPlay) {
          setVideoPlay(false);
          Ref.current.srcObject.getTracks().forEach((track) => {
            console.log(track);
            // 카메라 정지
            track.stop();
          });
        }
      });
  };

  const startAudio = async () => {
    const audio = document.querySelector("audio");
    // 마이크 권한
    const mike = await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((res) => {
        console.log(res);
        if (!audioPlay) {
          setAudioPlay(true);
          audio.srcObject = res;
          audio.onloadedmetadata = () => {
            audio.play();
          };
        } else if (audioPlay) {
          setAudioPlay(false);
          audio.srcObject = res;
          audio.onloadedmetadata = () => {
            audio.pause();
          };
        }
      });
  };

  const createUrl = () => {
    setLinkUrl("?" + Math.floor(Math.random() * 100000));
    setLinkCheck(true);
  };

  return (
    <>
      <Body>
        <Start>여기는 내장 카메라로 띄운 화면 입니당</Start>
        <video autoPlay ref={Ref} className="videoSection" width={"50%"} />
        <audio />
        <Button onClick={startVideo}>카메라 On / Off</Button>
        <Button onClick={startAudio}>마이크 On / Off</Button>
      </Body>
      <Button onClick={goHome}>홈으로 돌아가기</Button>
      <Button onClick={createUrl}>링크공유하기</Button>
      <Contenst>
        {linkCheck ? "https://agorara.vercel.app/test" + linkUrl : ""}
      </Contenst>
    </>
  );
};

export default Test;

const Button = styled.button`
  width: 50%;
  border: solid 1px black;
  margin-top: 10pt;
  display: block;
  margin-left: auto;
  margin-right: auto;
  color: white;
  background-color : black;
}
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

const Contenst = styled.div`
  text-align: center;
  margin-top: 20pt;
  font: normal normal 700 15pt Pretendard;
`;
