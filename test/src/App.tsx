import React, { ChangeEvent, FormEvent } from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

interface Message { name: string, text: string }
const App: React.FC = () => {
  const [messageList, setMessageList] = React.useState<Message[]>([]);
  const [name, setName] = React.useState('');
  const [value, setValue] = React.useState('');
  const socket = socketIOClient('http://220.90.237.33:4300',{
    transports: ['websocket'],
    jsonp: false}
  );
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name,value);
    
    socket.emit('msgToServer', { name: name, text: value },(error:any)=>{
      console.log(error)
    });
  };
  React.useEffect(() => {
    socket.on('msgToClient', (message: { name: string, text: string }) => {
      setMessageList(messageList => messageList.concat(message));
    })
  }, []);

  return (
    <div className="App">
      <section className="chat-list">
        {messageList.map((item: Message, i: number) =>
          <div key={i} className="message">
            <p className="username">{item.name.toUpperCase()}</p>
            <p className="message-text">{item.text}</p>
          </div>
        )}
      </section>
      <form className="chat-form"
        onSubmit={(e: FormEvent<HTMLFormElement>) => submit(e)}>
        <div className="chat-inputs">
          <input
            type="text"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
            placeholder="유저이름"
          />
          <input
            type="text"
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            value={value}
            placeholder="메세지입력하기"
          />
        </div>
        <button type="submit">입력하기</button>
      </form>
    </div>
  );
}

export default App;