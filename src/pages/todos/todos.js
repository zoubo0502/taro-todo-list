import './todos.scss';
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  addTodo,
  deleteTodo,
  modifyTodo,
  deleteTodos,
  changeTodoStatus
} from '../../actions/todos';
import TodosTop from './todos-top';
import TodosList from './todos-list';
import { deleteCategory, modifyCategory } from '../../actions/category';
@connect(
  ({ category, todos }) => ({ category, todos }),
  {
    addTodo,
    deleteTodo,
    modifyTodo,
    deleteCategory,
    modifyCategory,
    deleteTodos,
    changeTodoStatus
  }
)
export default class Todos extends Taro.Component {
  config = {
    navigationBarTitleText: '清单列表'
  };

  constructor() {
    super(...arguments);
    this.state = {
      catId: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    Taro.setStorage({
      key: 'categoryState',
      date: this.props.category
    });

    Taro.setStorage({
      key: 'todosState',
      date: this.props.todos
    });

  }

  componentWillMount() {
    let catId = this.$router.params['catId'];
    if (!catId) {
      catId = Taro.getStorage({
        key: 'lastOpenCate',
        success: function(res) {
          catId = res.data;
        },
        fail: function(err){
          console.log(err)
        }
      });
      console.log(catId);
    }
    if (catId) {
      this.setState({
        catId
      });
    }
  }

  goToCategory() {
    Taro.redirectTo({
      url: '/pages/category/category'
    });
  }

  render() {
    const {
      category,
      todos,
      addTodo,
      deleteTodo,
      modifyTodo,
      deleteCategory,
      modifyCategory,
      deleteTodos,
      changeTodoStatus
    } = this.props;
    if (
      !category.length ||
      !this.state.catId ||
      !category.find(cat => cat.id == this.state.catId)
    ) {
      return this.goToCategory();
    }
    const { name: catName, id: catId } = category.find(
      cat => cat.id == this.state.catId
    );
    const showTodos = [...todos].filter(todo => todo.catId == catId);
    return (
      <View>
        <TodosTop
          catId={catId}
          catName={catName}
          modifyCategory={modifyCategory}
          deleteCategory={deleteCategory}
          deleteTodos={deleteTodos}
        />
        <TodosList
          catId={catId}
          todos={showTodos}
          addTodo={addTodo}
          deleteTodo={deleteTodo}
          modifyTodo={modifyTodo}
          changeTodoStatus={changeTodoStatus}
        />
        <Button className="check-category" onClick={this.goToCategory}>
          查看目录
        </Button>
      </View>
    );
  }
}
