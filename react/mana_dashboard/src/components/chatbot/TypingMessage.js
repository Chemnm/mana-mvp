import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const TypingMessage = ({ text, shouldAnimate }) => {
  const [displayedText, setDisplayedText] = useState(shouldAnimate ? '' : text);

  useEffect(() => {
    if (shouldAnimate) {
      setDisplayedText('');
      if (text) {
        let i = 0;
        const intervalId = setInterval(() => {
          setDisplayedText(text.slice(0, i));
          i++;
          if (i > text.length) {
            clearInterval(intervalId);
          }
        }, 1); // Adjust typing speed here
        return () => clearInterval(intervalId);
      }
    }
  }, [text, shouldAnimate]);

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayedText}</ReactMarkdown>;
};

export default TypingMessage;
