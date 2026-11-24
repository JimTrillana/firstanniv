
import React, { useEffect, useRef, useState } from "react";
import "./LoveChat.css";

const messages = [
  {
    sender: "bebe",
    text: "Congratsssss jamie!!! 🫡 wah next na'ko pray for me.",
    time: "2:34 PM"
  },
  {
    sender: "you",
    text: "Ay Thank you po! 😄 Btw, Sino po si Jamie? 😅 and do your best po para ikaw na next kaya mo yan! ✊",
    time: "2:40 PM"
  },
  {
    sender: "bebe",
    text: "Shocksss",
    time: "2:45 PM"
  },
    {
    sender: "bebe",
    text: "Shockssss",
    time: "2:45 PM"
  },
  {
    sender: "you",
    text: "Okay lang yan hehe alam ko naman wrong send 😊",
    time: "2:46 PM"
  },
  {
    sender: "bebe",
    text: "Hahahahahahahaha sorry sinend ko lang kasi as attachment 😭",
    time: "2:47 PM"
  },
  {
    sender: "you",
    text: "Okay lang hahaha no worries. O ayan send mo na ule kay Jamie. Pasabi congrats! 😂",
    time: "2:48 PM"
  },
  {
    sender: "bebe",
    text: "Hahaha! Di mo naman ako kilala diba. Baka lokohin moko kapag nakita moko 😭",
    time: "2:49 PM"
  },
  {
    sender: "you",
    text: "Okay lang yan. Kakamayan kita icongrats kita 😄",
    time: "2:57 PM"
  },
  {
    sender: "bebe",
    text: "Sige haa hahahaha. Sana pasado din ako sa June ha hahahaha 😆",
    time: "2:58 PM"
  },
  {
    sender: "you",
    text: "Sige sa June tatandaan ko yan hahaha galingan mo ha",
    time: "3:11 PM"
  },
  {
    sender: "bebe",
    text: "Pag yan di mo mi-nark sa calendar mo eh June 2 and 3 ha hahahaha 😆",
    time: "3:25 PM"
  }
];

export default function LoveChat({ onClose }) {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const chatBodyRef = useRef(null);
  const timerRef = useRef(null);
  const [typingSender, setTypingSender] = useState("bebe");

  const startChat = () => {
    clearTimeout(timerRef.current);

    setVisibleMessages([]);
    setIsTyping(false);
    setIsFinished(false);

    let index = 0;

    const showNextMessage = () => {
      if (index >= messages.length) {
        setIsTyping(false);
        setIsFinished(true);
        return;
      }

      const currentMessage = messages[index];
      if(currentMessage.sender === "bebe"){
        setTypingSender("bebe");
        setIsTyping(true);
      }
      else{
        setTypingSender("you");
        setIsTyping(true);
      }

      timerRef.current = setTimeout(() => {
        setVisibleMessages((previous) => [
          ...previous,
          currentMessage
        ]);

        setIsTyping(false);
        index++;

        timerRef.current = setTimeout(
          showNextMessage,
          1000
        );
      }, 1400);
    };

    showNextMessage();
  };

  useEffect(() => {
    startChat();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [visibleMessages, isTyping]);

  return (
      <div className="love-chat-section">

      <div className="love-chat-heading">
        <span>💌</span>
<h2>Our First Conversation</h2>
<p>A little reminder of how our story began.</p>
      </div>

      <div
        className="love-chat-container"
        onClick={(e) => e.stopPropagation()}
        >

        <div className="love-chat-header">
          <div className="chat-avatar"> <img
                src="/images/myan.jpeg"
                alt="Bebe"
            /></div>

          <div className="chat-contact">
            <h3>Sean Ann</h3>
            <span>Always my favorite person</span>
          </div>

        <button
            className="love-chat-close"
            onClick={onClose}
            aria-label="Close chat"
            title="Close chat"
        >
            ×
        </button>

        </div>

        <div className="love-chat-body" ref={chatBodyRef}>

          <div className="chat-date">
            Our first conversation 💗
          </div>

        {visibleMessages.map((message, index) => (
        <div
            key={index}
            className={`chat-message-row ${message.sender}`}
        >
            {message.sender === "bebe" && (
            <img
                src="/images/myan.jpeg"
                alt="Bebe"
                className="small-avatar"
            />
            )}

            <div className={`chat-bubble ${message.sender}`}>
            <p>{message.text}</p>

            <span className="chat-time">
                {message.time}
            </span>
            </div>

            {message.sender === "you" && (
            <img
                src="/images/jim.jpeg"
                alt="You"
                className="small-avatar you-avatar"
            />
            )}
        </div>
        ))}

      {isTyping && (
        <div className={`chat-message-row ${typingSender}`}>
            {typingSender === "bebe" && (
            <img
                src="/images/myan.jpeg"
                alt="Bebe"
                className="small-avatar"
            />
            )}

            <div className="typing-bubble">
            <span></span>
            <span></span>
            <span></span>
            </div>

            {typingSender === "you" && (
            <img
                src="/images/jim.jpeg"
                alt="You"
                className="small-avatar you-avatar"
            />
            )}
        </div>
        )}
          {isFinished && (
            <div className="chat-ending">
              <span>💕</span>
              <p>And this is just one of our many memories.</p>
              <strong>I love you, forever and always! ❤️</strong>
            </div>
          )}

        </div>

        <div className="love-chat-footer">
          {isFinished ? (
            <div className="conversation-buttons">
    <button onClick={startChat}>
      ↻ Replay our conversation
    </button> 


    <button onClick={onClose} style={{marginTop:"10px"}}>
      ❤️ Proceed to see more memories
    </button>
  </div>
          ) : (
            <div className="chat-input-placeholder">
              <span>Type a message...</span>
              <span>❤️</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
