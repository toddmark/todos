import './App.scss';
import { useState, useEffect, useReducer } from 'react';
import {
  Row, Col, Input, List, Divider, Typography, Pagination, Space
} from "antd";
import { v4 as uuidv4 } from 'uuid';
import 'antd/dist/antd.min.css';
import { addTodo, getList } from '@/api/todo';

const { Search } = Input;
const { Text } = Typography;

function App() {
  const [click, setstate] = useState(0);
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [totalPage, setPage] = useState(0);
  const [state, dispatch] = useReducer(reducer, { time: new Date().toLocaleString() })

  function reducer(state, action) {
    const { time } = state;
    if (action.type === 'time') {
      return { ...state, time: new Date().toLocaleString() };
    }
  }

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${click} times`;
    updateList();
  }, [click]);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'time' });
    }, 1000)
    return () => clearInterval(id);
  }, [dispatch]);

  const updateList = (data) => {
    getList(data).then(res => {
      setList(res.data.result);
      setPage(res.data.total);
    });
  }

  const handleClick = () => {
    setstate(click + 1)
  }

  const onChangeInput = (e) => {
    setText(e.target.value);
  }

  const onPressEnter = () => {
    const newTodo = { text, id: uuidv4(), complete: false };
    setText('');
    addTodo(newTodo).then(() => {
      updateList();
    });
  }

  const onSearchInput = (e) => {
    setSearchText(e.currentTarget.value);
  }

  const onPressEnterSearch = () => {
    setSearchText('');
  }

  const pageChange = (page, pageSize) => {
    console.log(page, pageSize);
    updateList({ page, pageSize });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3 onClick={handleClick}>Phoenix {click}</h3>
      </header>
      <div>
        <Row>
          <Col span="12" offset={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input value={text} onChange={onChangeInput} onPressEnter={onPressEnter} />
              <Divider />
              <Search value={searchText} onChange={onSearchInput} onPressEnter={onPressEnterSearch} />
              <List
                className='todo-list'
                header={<div>Todo Lists</div>}
                bordered
                dataSource={searchText ? list.filter(item => item.text.includes(searchText)) : list}
                renderItem={item => {
                  const createAt = new Date(item.createAt).toString() === 'Invalid Date' ? item.createAt : new Date(item.createAt).toLocaleString();
                  return (
                    <List.Item className='todo-list-item'>
                      <span> <Text style={{ width: 200, textAlign: "left" }} ellipsis={{ tooltip: item.text }}>{item.text}</Text> </span>
                      <span className='operate done'>Done</span>
                      <span className='operate delete'>Del</span>
                      <span className='create-at'>{createAt}</span>
                    </List.Item>
                  )
                }}
              />
              <Pagination defaultCurrent={1} total={totalPage} onChange={pageChange} />
              <h5>{state.time}</h5>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
