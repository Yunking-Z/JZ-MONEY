import React, { useState } from 'react';
import { Card, Input, Button, message, Avatar } from 'antd';
import { MessageOutlined, SendOutlined, QuestionCircleOutlined, SettingOutlined, BankOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const AIAssistant: React.FC = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<{
    id: number;
    text: string;
    isUser: boolean;
  }[]>([
    {
      id: 1,
      text: '你好！我是你的AI财务助手。有什么可以帮助你的吗？',
      isUser: false,
    },
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      message.error('消息不能为空');
      return;
    }

    // 添加用户消息
    const newUserMessage = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
    };

    setMessages([...messages, newUserMessage]);
    setMessageText('');

    // 模拟AI回复（实际功能留待后期开发）
    setTimeout(() => {
      const newAiMessage = {
        id: messages.length + 2,
        text: '感谢你的提问！该功能正在开发中，敬请期待。',
        isUser: false,
      };
      setMessages([...messages, newUserMessage, newAiMessage]);
    }, 1000);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>AI财务助手</h1>
      <Card style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', marginBottom: '16px' }}>
          {messages.map(message => (
            <div key={message.id} style={{ marginBottom: '16px', display: 'flex' }}>
              {message.isUser ? (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ maxWidth: '70%', marginLeft: 'auto' }}>
                    <div style={{ background: '#1890ff', color: 'white', padding: '8px 12px', borderRadius: '8px 8px 0 8px' }}>
                      {message.text}
                    </div>
                  </div>
                  <Avatar style={{ marginLeft: '8px', backgroundColor: '#87d068' }}>用户</Avatar>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex' }}>
                  <Avatar style={{ marginRight: '8px', backgroundColor: '#1890ff' }}><BankOutlined /></Avatar>
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{ background: '#f0f0f0', padding: '8px 12px', borderRadius: '8px 8px 8px 0' }}>
                      {message.text}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', padding: '16px', borderTop: '1px solid #e8e8e8' }}>
          <TextArea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="输入你的问题..."
            style={{ flex: 1, marginRight: '16px', resize: 'none', height: '64px' }}
            onPressEnter={(e) => {
              if (e.shiftKey) return;
              handleSendMessage();
            }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            style={{ height: '64px' }}
          >
            发送
          </Button>
        </div>
      </Card>

      <div style={{ marginTop: '24px' }}>
        <h3>常用功能（开发中）</h3>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <Button type="default" icon={<QuestionCircleOutlined />} style={{ flex: 1 }}>财务咨询</Button>
          <Button type="default" icon={<MessageOutlined />} style={{ flex: 1 }}>消费分析</Button>
          <Button type="default" icon={<SettingOutlined />} style={{ flex: 1 }}>预算规划</Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;