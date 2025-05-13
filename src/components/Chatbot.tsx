import { useState, useEffect, useRef, SetStateAction } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Box, Button, IconButton, Typography, TextField, GlobalStyles } from '@mui/material';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ type: string; content: string }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      return;
    }

    const userMessage = { type: 'user', content: userInput };
    setChatHistory([...chatHistory, userMessage]);

    setIsLoading(true);
    setUserInput('');

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyCtgd84cUtdDWhmQrQbnyEXpn3iPQNjMVw');
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent(userInput);
      const responseText = result.response?.text() || 'No response received.';

      setChatHistory((prev) => [...prev, { type: 'ai', content: responseText }]);
    } catch (error) {
      console.error('Error generating content:', error);
      setChatHistory((prev) => [
        ...prev,
        { type: 'ai', content: 'Failed to get response. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: { key: string; shiftKey: any; preventDefault: () => void }) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes bounce': {
            '0%, 60%, 100%': {
              transform: 'translateY(0)',
            },
            '30%': {
              transform: 'translateY(-4px)',
            },
          },
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 1000,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          overflow: 'hidden'
        }}
      >
        {isOpen && (
          <Box
            sx={{
              width: '320px',
              marginBottom: '1rem',
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              maxHeight: '500px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(to right, #6b21b2, #8a2be2)',
                color: '#f0f0f0',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& h3': {
                  margin: 0,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                },
                '& .close-button': {
                  background: 'transparent',
                  border: 'none',
                  color: '#f0f0f0',
                  cursor: 'pointer',
                  width: '24px',
                  height: '24px',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.8,
                  transition: 'opacity 0.2s',
                  '&:hover': {
                    opacity: 1,
                  },
                  '& svg': {
                    width: '16px',
                    height: '16px',
                  },
                },
              }}
            >
              <Typography variant="h3">AI Assistant</Typography>
              <IconButton className="close-button" onClick={toggleChat}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                padding: '1rem',
                overflowY: 'auto',
                backgroundColor: '#222222',
                maxHeight: '350px',
                '& .empty-state': {
                  textAlign: 'center',
                  color: 'rgba(240, 240, 240, 0.6)',
                  padding: '2rem 0',
                },
                '& .message-container': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                },
                '& .message-wrapper': {
                  display: 'flex',
                  '&.user-message-wrapper': {
                    justifyContent: 'flex-end',
                  },
                  '&.ai-message-wrapper': {
                    justifyContent: 'flex-start',
                  },
                  '& .message': {
                    maxWidth: '80%',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    wordBreak: 'break-word',
                    '&.user-message': {
                      backgroundColor: '#8a2be2',
                      color: '#f0f0f0',
                      borderBottomRightRadius: '4px',
                    },
                    '&.ai-message': {
                      backgroundColor: '#444444',
                      color: '#f0f0f0',
                      borderBottomLeftRadius: '4px',
                    },
                  },
                  '& .typing-indicator': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    '& .dot': {
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(240, 240, 240, 0.7)',
                      margin: '0 3px',
                      animation: 'bounce 1.5s infinite',
                      '&:nth-child(2)': {
                        animationDelay: '0.2s',
                      },
                      '&:nth-child(3)': {
                        animationDelay: '0.4s',
                      },
                    },
                  },
                },
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              }}
              ref={chatContainerRef}
            >
              {chatHistory.length === 0 ? (
                <Box className="empty-state">
                  <Typography>How can I help you today?</Typography>
                </Box>
              ) : (
                <Box className="message-container">
                  {chatHistory.map((message, index) => (
                    <Box
                      key={index}
                      className={`message-wrapper ${message.type}-message-wrapper`}
                      sx={{
                        display: 'flex',
                        ...(message.type === 'user' && { justifyContent: 'flex-end' }),
                        ...(message.type === 'ai' && { justifyContent: 'flex-start' }),
                      }}
                    >
                      <Box
                        className={`message ${message.type}-message`}
                        sx={{
                          maxWidth: '80%',
                          padding: '0.8rem 1rem',
                          borderRadius: '12px',
                          wordBreak: 'break-word',
                          ...(message.type === 'user' && {
                            backgroundColor: '#8a2be2',
                            color: '#f0f0f0',
                            borderBottomRightRadius: '4px',
                          }),
                          ...(message.type === 'ai' && {
                            backgroundColor: '#444444',
                            color: '#f0f0f0',
                            borderBottomLeftRadius: '4px',
                          }),
                        }}
                      >
                        {message.content}
                      </Box>
                    </Box>
                  ))}
                  {isLoading && (
                    <Box className="message-wrapper ai-message-wrapper">
                      <Box
                        className="message ai-message typing-indicator"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.5rem 1rem',
                        }}
                      >
                        <Box
                          className="dot"
                          sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(240, 240, 240, 0.7)',
                            margin: '0 3px',
                            animation: 'bounce 1.5s infinite',
                          }}
                        />
                        <Box
                          className="dot"
                          sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(240, 240, 240, 0.7)',
                            margin: '0 3px',
                            animation: 'bounce 1.5s infinite',
                            animationDelay: '0.2s',
                          }}
                        />
                        <Box
                          className="dot"
                          sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(240, 240, 240, 0.7)',
                            margin: '0 3px',
                            animation: 'bounce 1.5s infinite',
                            animationDelay: '0.4s',
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>

            {/* Chat Input */}
            <Box
              sx={{
                padding: '1rem',
                backgroundColor: '#181818',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                '& .input-wrapper': {
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#333333',
                  borderRadius: '24px',
                  padding: '0 0.5rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'border-color 0.2s ease',
                  '&:focus-within': {
                    borderColor: 'rgba(138, 43, 226, 0.5)',
                  },
                  '& input': {
                    flexGrow: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#f0f0f0',
                    padding: '0.75rem 1rem',
                    fontSize: '0.95rem',
                    '&:focus': {
                      outline: 'none',
                    },
                    '&::placeholder': {
                      color: 'rgba(240, 240, 240, 0.5)',
                    },
                    '&:disabled': {
                      opacity: 0.7,
                      cursor: 'not-allowed',
                    },
                  },
                  '& .send-button': {
                    backgroundColor: '#8a2be2',
                    border: 'none',
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '& svg': {
                      width: '16px',
                      height: '16px',
                    },
                    '&:hover': {
                      backgroundColor: '#6b21b2',
                    },
                    '&.disabled': {
                      background: 'linear-gradient(270deg, #7F00FF 0%, #E100FF 50%, #7F00FF 100%)',
                      cursor: 'not-allowed',
                    },
                  },
                },
              }}
            >
              <Box className="input-wrapper">
                <TextField
                  inputRef={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  sx={{
                    flexGrow: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#f0f0f0',
                    padding: '0.75rem 1rem',
                    fontSize: '0.95rem',
                    '&:focus': {
                      outline: 'none',
                    },
                    '&::placeholder': {
                      color: 'rgba(240, 240, 240, 0.5)',
                    },
                    '&:disabled': {
                      opacity: 0.7,
                      cursor: 'not-allowed',
                    },
                  }}
                  InputProps={{ disableUnderline: true }}
                />
                <IconButton
                  onClick={handleSubmit}
                  disabled={isLoading || !userInput.trim()}
                  className={!userInput.trim() ? 'send-button disabled' : 'send-button'}
                  sx={{
                    backgroundColor: '#8a2be2',
                    border: 'none',
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    '& svg': {
                      width: '16px',
                      height: '16px',
                    },
                    '&:hover': {
                      backgroundColor: '#6b21b2',
                    },
                    ...(!userInput.trim() && {
                      background: 'linear-gradient(270deg, #7F00FF 0%, #E100FF 50%, #7F00FF 100%)',
                      cursor: 'not-allowed',
                    }),
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}

        {/* Chat Button */}
        <Button
          onClick={toggleChat}
          className={`chat-toggle-button ${isOpen ? 'active' : ''}`}
          sx={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(270deg, #7F00FF 0%, #E100FF 50%, #7F00FF 100%)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '& svg': {
              width: '28px',
              height: '28px',
            },
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
              borderRadius: '100%'
            },
            '&:active': {
              transform: 'scale(0.95)'
            },
            ...(isOpen && {
              background: 'linear-gradient(270deg, #7F00FF 0%, #E100FF 50%, #7F00FF 100%)',
            }),
          }}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Button>
      </Box>
    </>
  );
};

export default Chatbot;