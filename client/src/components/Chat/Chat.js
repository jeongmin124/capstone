import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socket from "../../socket";

const Chat = ({ display, roomId }) => {
  const currentUser = sessionStorage.getItem("user");
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    socket.on("FE-receive-message", ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const msg = e.target.value;

      if (msg) {
        socket.emit("BE-send-message", { roomId, msg, sender: currentUser });
        inputRef.current.value = "";
      }
    }
  };

  return (
    <ChatContainer className={display ? "" : "width0"}>
      <TopHeader>Chat</TopHeader>
      <ChatArea>
        <MessageList>
          {msg.map(({ sender, msg }, idx) => {
            if (sender !== currentUser) {
              return (
                <Message key={idx}>
                  <strong>{sender}</strong> {/* 사용자 이름 */}
                  <div>
                    <p>{msg}</p>
                    <Timestamp>
                      {new Date().toLocaleString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Timestamp>
                  </div>
                </Message>
              );
            } else {
              return (
                <UserMessage key={idx}>
                  <strong>{sender}</strong> {/* 사용자 이름 */}
                  <div>
                    <Timestamp>
                      {new Date().toLocaleString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </Timestamp>
                    <p>{msg}</p>
                  </div>
                </UserMessage>
              );
            }
          })}
          <div style={{ float: "left", clear: "both" }} ref={messagesEndRef} />
        </MessageList>
      </ChatArea>
      <BottomInput
        ref={inputRef}
        onKeyUp={sendMessage}
        placeholder="Enter your message"
      />
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: whitesmoke;
  transition: all 0.5s ease;
  border-radius: 10px;
  padding: 0 10px;

  overflow: hidden;
`;

const TopHeader = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 20px;
  color: black;
  font-family: "NunitoExtraBold";
  background-color: white;
  border: 1.3px solid #999999;
  border-radius: 8px;
`;

const ChatArea = styled.div`
  width: 100%;
  height: 83%;
  max-height: 83%;
  overflow-x: hidden;
  overflow-y: auto;
`;

const MessageList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 15px;
  color: #454552;
`;

const Message = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 15px;
  text-align: left;
  font-family: "NunitoMedium";

  > strong {
    margin-bottom: 5px;
    font-size: 14px;
  }

  > div {
    display: flex;
    align-items: center;
    margin-left: -5px;
  }

  > div > p {
    max-width: 65%;
    width: auto;
    padding: 9px;
    margin-right: 10px;
    border: 1px solid rgba(78, 161, 211, 0.3);
    border-radius: 15px;
    box-shadow: 0px 0px 3px black;
    font-size: 14px;
    background-color: white;
  }
`;

const UserMessage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 16px;
  margin-top: 15px;
  text-align: right;
  font-family: "NunitoMedium";

  > strong {
    margin-bottom: 5px;
    margin-right: 8px;
    font-size: 14px;
  }

  > div {
    display: flex;
    align-items: center;
    margin-right: -8px;
  }

  > div > p {
    max-width: 65%;
    width: auto;
    padding: 9px;
    margin-right: 10px;
    border: 1px solid rgba(78, 161, 211, 0.3);
    border-radius: 15px;
    background-color: black;
    color: white;
    font-size: 14px;
    text-align: left;
  }
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: gray;
  margin-right: 5px;
  margin-top: 20px;
`;


const BottomInput = styled.input`
  bottom: 0;
  width: 100%;
  height: 8%;
  padding: 15px;
  border-top: 1px solid rgb(69, 69, 82, 0.25);
  box-sizing: border-box;
  opacity: 0.7;
  margin-bottom: 10px;
  font-family: "NunitoMedium";

  :focus {
    outline: none;
  }
`;

export default Chat;
