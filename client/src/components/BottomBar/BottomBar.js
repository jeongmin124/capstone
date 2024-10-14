import React, { useCallback, useState } from "react"; // useState 추가
import styled from "styled-components";
import gptLogo from "./gptlogo.png";

const BottomBar = ({
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  videoDevices,
  showVideoDevices,
  clickScreenSharing,
  screenShare,
  onChatButtonClick,
}) => {
  return (
    <>
      <Bar>
        <Left>
          <DocumentButton>
            <FaIcon className="fas fa-edit icon"></FaIcon>
            <span>Edit Doc</span>
          </DocumentButton>
          <ChatButton onClick={onChatButtonClick}>
            <img src={gptLogo} alt="ChatGPT Logo" />
          </ChatButton>
        </Left>
        <Center>
          <CameraButton onClick={toggleCameraAudio} data-switch="video">
            <div>
              {userVideoAudio.video ? (
                <FaIcon className="fas fa-video"></FaIcon>
              ) : (
                <FaIcon className="fas fa-video-slash"></FaIcon>
              )}
            </div>
            카메라
          </CameraButton>
          {showVideoDevices && (
            <SwitchList>
              {videoDevices.length > 0 &&
                videoDevices.map((device) => {
                  return (
                    <div
                      key={device.deviceId}
                      onClick={clickCameraDevice}
                      data-value={device.deviceId}
                    >
                      {device.label}
                    </div>
                  );
                })}
              <div>Switch Camera</div>
            </SwitchList>
          )}
          <CameraButton onClick={toggleCameraAudio} data-switch="audio">
            <div>
              {userVideoAudio.audio ? (
                <FaIcon className="fas fa-microphone"></FaIcon>
              ) : (
                <FaIcon className="fas fa-microphone-slash"></FaIcon>
              )}
            </div>
            마이크
          </CameraButton>
          <ScreenButton onClick={clickScreenSharing}>
            <div>
              <FaIcon
                className={`fas fa-desktop ${screenShare ? "sharing" : ""}`}
              ></FaIcon>
            </div>
            화면 공유
          </ScreenButton>
        </Center>
        <StopButton onClick={goToBack}>Stop</StopButton>
      </Bar>
    </>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  overflow: hidden;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 8px 15px;
`;

const Center = styled.div`
  display: flex;
  margin-right: 140px;
`;

const CameraButton = styled.div`
  font-family: "NunitoExtraBold";
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  margin-top: 5px;
  margin-left: 15px;

  :hover {
    opacity: 0.7;
    cursor: pointer;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: rgb(251, 33, 117);
  }

  .fa-video-slash {
    color: rgb(251, 33, 117);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -65.95px;
  left: 80px;
  background-color: #4ea1d3;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

const ScreenButton = styled.div`
  font-family: "NunitoExtraBold";
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  margin-top: 5px;
  margin-left: 15px;

  :hover {
    opacity: 0.7;
    cursor: pointer;
  }

  .sharing {
    color: rgb(251, 33, 117);
  }
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 20px;
  margin-right: 20px;
  background: rgb(251, 33, 117);
  background: linear-gradient(
    0deg,
    rgba(251, 33, 117, 1) 0%,
    rgba(234, 76, 137, 1) 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 4px;
  outline: none;
  border-radius: 10px;
  overflow: hidden;
  font-family: "NunitoExtraBold";

  cursor: pointer;

  :before {
    position: absolute;
    content: "";
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
  }

  :hover {
    text-decoration: none;
    opacity: 0.8;
    cursor: pointer;
  }
`;

const DocumentButton = styled.div`
  width: 120px;
  height: 40px;
  border: none;
  font-size: 16px;
  margin-right: 5px;
  padding-top: 2px;
  padding-right: 2px;
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border-radius: 8px;
  font-family: "NunitoExtraBold";

  cursor: pointer;

  :hover {
    text-decoration: none;
    opacity: 0.8;
    cursor: pointer;
  }

  .icon {
    font-size: 18px;
    margin-bottom: 3px;
  }
`;

const ChatButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  width: 44px;
  height: 44px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 26px;
    height: 26px;
  }

  :hover {
    opacity: 0.8;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

export default BottomBar;
