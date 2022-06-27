import {get, post} from '@/utils/http';



console.log(get, post);

const addTodo = (data) => {
  post('/addtodo', data)
}

export {addTodo}
