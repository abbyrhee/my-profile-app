import React from 'react';
import ChatBot from '../components/ChatBot';
import Wrapper from '../components/Wrapper';
import styles from './ChatPage.module.css';

const ChatPage = () => {
  return (
    <Wrapper>
      <div className={styles.chatPageContainer}>
        <h1>Chat Assistant</h1>
        <p className={styles.description}>
          Ask me anything about this app or just chat with me!
        </p>
        <ChatBot />
      </div>
    </Wrapper>
  );
};

export default ChatPage;
