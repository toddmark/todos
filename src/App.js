import './App.scss';
import { useState, useEffect } from 'react';
import { Row, Col, Input, List, Divider, Typography } from "antd";
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.min.css';
import { addTodo } from './api/todo';

const { Search } = Input;
const { Text } = Typography;

function App() {

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${click} times`;
  });

  const [click, setstate] = useState(0);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleClick = () => {
    setstate(click + 1)
  }

  const onChangeInput = (e) => {
    setText(e.target.value);
  }

  const onPressEnter = () => {
    const newTodo = { text, id: uuidv4(), complete: false };
    setList([...list, newTodo]);
    setText('');
    addTodo(newTodo);
  }

  const onSearchInput = (e) => {
    setSearchText(e.currentTarget.value);
  }

  const onPressEnterSearch = () => {
    setSearchText('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={handleClick}>Phoenix {click}</h1>
      </header>
      <div>
        <Row>
          <Col span="12" offset={6}>
            <Input value={text} onChange={onChangeInput} onPressEnter={onPressEnter} />
          </Col>
          <Divider />
          <Col span="12" offset={6}>
            <Search value={searchText} onChange={onSearchInput} onPressEnter={onPressEnterSearch} />
          </Col>
          <Col span="12" offset={6}>
            <List
              className='todo-list'
              header={<div>Todo Lists</div>}
              bordered
              dataSource={searchText ? list.filter(item => item.text.includes(searchText)) : list}
              renderItem={item => (
                <List.Item>
                  <span> <Text style={{width: 200, textAlign: "left"}} ellipsis={{tooltip: item.text}}>{item.text}</Text> </span>
                  <span className='operate done'>Done</span>
                  <span className='operate delete'>Del</span>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
