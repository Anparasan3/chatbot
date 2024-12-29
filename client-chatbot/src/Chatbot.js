import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaPaperPlane, FaTimes, FaComments } from "react-icons/fa";

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatbotContainer = styled.div`
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.open ? "block" : "none")};
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  background: white;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
`;

const SubHeader = styled.div`
  font-size: 16px;
  color: #555;
  margin-top: -10px;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #007bff;
  }
`;

const ChatArea = styled.div`
  padding: 16px;
  height: 300px;
  overflow-y: auto;
  background: #f9f9f9;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const OptionButton = styled.button`
  border: 1px solid #007bff;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 14px;
  color: #007bff;
  background: white;
  cursor: pointer;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const Message = styled.div`
  margin: 8px 0;
  padding: 10px 14px;
  background: ${(props) => (props.isUser ? "#007bff" : "#f1f1f1")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  border-radius: 16px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  max-width: 70%;
`;

const MessageContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
`;

const SendButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const ToggleButton = styled(FaComments)`
  font-size: 40px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const Chatbot = ({serverSocketUrl}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi 👋, How can I help you today?", isUser: false },
  ]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = new WebSocket("wss://your-server-url/ws");
    const newSocket = new WebSocket(serverSocketUrl);
    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const serverMessage = event.data;
      setMessages((prev) => [...prev, { text: serverMessage, isUser: false }]);
    };

    return () => newSocket.close();
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }]);
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <ChatbotWrapper>
      <ToggleButton onClick={() => setIsOpen(!isOpen)} />
      <ChatbotContainer open={isOpen}>
        <Header>
          Hi 👋
          <SubHeader>User Name</SubHeader>
          <CloseButton onClick={() => setIsOpen(false)} />
        </Header>
        <ChatArea>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              {msg.text}
            </Message>
          ))}
          {/* <ButtonArea>
            <OptionButton>General policies</OptionButton>
            <OptionButton>Payroll and Compensation</OptionButton>
            <OptionButton>Company’s leave policies</OptionButton>
          </ButtonArea> */}
        </ChatArea>
        <MessageContainer>
          <Input
            type="text"
            placeholder="Message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton onClick={handleSend}>
            <FaPaperPlane />
          </SendButton>
        </MessageContainer>
      </ChatbotContainer>
    </ChatbotWrapper>
  );
};

export default Chatbot;
