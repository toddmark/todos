import {get, post} from '@/utils/http';

const addTodo = (data) => {
  return post('/addtodo', data)
}

const getList = (data) => {
  return get('/getList', data)
}

export {addTodo, getList}
