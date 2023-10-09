import './App.css';
import logo from './assets/logo.png'
import sendBtn from './assets/send.svg'
// import { sendMsgToOpenAI } from './openai';
import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";


function App() {

  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    var question = input + ", First check the question is realated to maths or physics if it realted then response the answer step by step else response should be 'This question is not related to Maths and Physics'"
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0.7, // Adjust as needed
        max_tokens: 150,   // Adjust as needed
      });
      setResult(response.data.choices[0].text);
      console.log(result)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    console.log(input)
  };


  return (
    <div className="App">
    
      <div className="main">
      <div className="upperSideTop"><img src={logo} width="50px" alt="Logo" className="logo" /><span className="brand">Calculadoras de fisica</span></div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" value = {input} onChange={(e) => {setInput(e.target.value)}} placeholder='Ask your math question!' id=''/> <button className="send" onClick={handleClick}><img src={sendBtn} alt="Send" /></button>
          </div>
        </div>
        <div className="chats">
          <div className="chat">
          {loading?(
            <p>Loading...</p>
          ):(
            result ? (
              <pre className="txt">{result}</pre>
            ) : (
              <h3 className="answerHint">Expect your answer here.</h3>
            )
          )}
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
