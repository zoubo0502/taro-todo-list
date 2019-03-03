import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import './index.scss';
import finish from '../assets/finish.svg';
import notfinish from '../assets/not-finish.svg';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtSwipeAction,
  AtInput,
  AtList,
  AtListItem,
  AtToast
} from 'taro-ui';
import add from '../assets/add.svg';
import smile from '../assets/smile.svg';
import back_to_cat from '../assets/return.svg';

export default class TodosList extends Taro.Component {
  static defaultProps = {
    todos: []
  };

  constructor() {
    super(...arguments);
    this.state = {
      editId: -1,
      idEditTodoModalOpened: false,
      todoName: '',
      modalTitle: '',
      isToastFirstTime: true
    };
  }

  operateTodo = (id, event) => {
    if (event.text == '编辑') {
      this.setState({
        editId: id,
        idEditTodoModalOpened: true,
        modalTitle: '编辑Todo名'
      });
    }
    if (event.text == '删除') {
      this.props.deleteTodo(id);
    }
  };

  toCloseEditModal = () => {
    this.setState({
      editId: -1,
      idEditTodoModalOpened: false,
      todoName: '',
      modalTitle: ''
    });
  };

  toOperateTodo = () => {
    if (this.state.todoName) {
      if (this.state.editId == -1) {
        this.props.addTodo(this.state.todoName, this.props.catId);
      } else {
        this.props.modifyTodo(this.state.editId, this.state.todoName);
        Taro.redirectTo({
          url: `/pages/todos/todos?catId=${this.props.catId}`
        });
      }
    }

    this.setState({
      editId: -1,
      idEditTodoModalOpened: false,
      todoName: '',
      modalTitle: ''
    });
  };

  handleTodoNameChange = todoName => {
    this.setState({
      todoName
    });
  };

  toChangeTodoStatus = id => {
    this.props.changeTodoStatus(id);
    Taro.redirectTo({
      url: `/pages/todos/todos?catId=${this.props.catId}`
    });
  };

  showAddTodoModal = () => {
    this.setState({
      idEditTodoModalOpened: true,
      modalTitle: '添加新Todo'
    });
  };

  goToCategory() {
    Taro.redirectTo({
      url: '/pages/category/category'
    });
  }

  handleToast() {
    this.setState({
      isToastFirstTime: false
    });
  }

  render() {
    const { todos } = this.props;
    return (
      <View>
        <AtList>
          {todos.map(todo => {
            return (
              <AtSwipeAction
                key={todo.id}
                autoClose
                onClick={this.operateTodo.bind(this, todo.id)}
                options={[
                  {
                    text: '编辑',
                    style: {
                      backgroundColor: '#6190E8'
                    }
                  },
                  {
                    text: '删除',
                    style: {
                      backgroundColor: '#FF4949'
                    }
                  }
                ]}
              >
                <AtListItem
                  onClick={this.toChangeTodoStatus.bind(this, todo.id)}
                  title={todo.name}
                  note="点击更改状态"
                  extraText="左滑编辑"
                  arrow="right"
                  thumb={todo.status ? finish : notfinish}
                />
              </AtSwipeAction>
            );
          })}

          <View className="add-list">
            <AtList>
              <AtListItem key="blank" />
              <AtListItem
                key="add-todo"
                title="添加新Todo"
                thumb={add}
                onClick={this.showAddTodoModal.bind(this)}
              />
            </AtList>
            <AtListItem
              key="blank"
              title="返回查看目录"
              thumb={back_to_cat}
              onClick={this.goToCategory.bind(this)}
            />
          </View>
        </AtList>

        {/* Toast */}
        <AtToast
          isOpened={!todos.length && this.state.isToastFirstTime}
          text={'开始添加Todo来跟踪状态吧！'}
          image={smile}
          duration={2000}
          onClose={this.handleToast.bind(this)}
        />
        {/* edit todo modal */}
        <AtModal isOpened={this.state.idEditTodoModalOpened}>
          <AtModalHeader>{this.state.modalTitle}</AtModalHeader>
          <AtModalContent>
            <AtInput
              name="value"
              title="Todo名称"
              type="text"
              placeholder="请输入Todo名称"
              value={this.state.todoName}
              focus={this.state.idEditTodoModalOpened}
              onChange={this.handleTodoNameChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.toCloseEditModal.bind(this)}>取消</Button>
            <Button onClick={this.toOperateTodo.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}
