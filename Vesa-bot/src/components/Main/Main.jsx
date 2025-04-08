import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Main = () => {
  const {
    input,
    setInput,
    onSent,
    loading,
    resultData,
    recentPrompt,
    showResult,
  } = useContext(Context);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSent(input);
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>Vesa</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">

        {!showResult
        ?<>
         <div className="greet">
          <p><span>Hello, User.</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className="cards">
          <div className="card">
            <p>Suggest beautiful places to see on the upcoming road trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Brief this concept and give me the key points: Urban Planning</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>

        </>:
        <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
              ?<div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
              :
              <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
        </div>

        }



       
        {/* ✅ Show the result if available */}
        {/* {showResult && (
          <div className="result-container">
            <div className="user-prompt">
              <p><strong>You:</strong> {recentPrompt}</p>
            </div>
            <div className="gemini-response">
              <p><strong>Gemini:</strong> {resultData}</p>
            </div>
          </div>
        )} */}

        {/* ✅ Show loading */}
        {/* {loading && <p className="loading">Generating response...</p>} */}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter the prompt here'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div onClick={() => onSent(input)}>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input?<img src={assets.send_icon} alt="Send" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Google's Gemini is a family of multimodal AI models, meaning they can process and generate text, code, audio, images, and video. It's designed to be flexible and capable across different tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
