import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';
import finish from '../assets/finish.svg';
import notfinish from '../assets/not-finish.svg';
import { AtSwipeAction } from 'taro-ui';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { AtInput, AtForm } from 'taro-ui';
import add from '../assets/add.svg';

export default class TodosList extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      editId: -1,
      idEditTodoModalOpened: false,
      todoName: '',
      modalTitle: ''
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
      console.log(id);
      console.log(this.props.deleteTodo);
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
    if (this.state.editId == -1) {
      this.props.addTodo(this.state.todoName, this.props.catId);
    } else {
      this.props.modifyTodo(this.state.editId, this.state.todoName);
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
    console.log(this.props.changeTodoStatus);
    this.props.changeTodoStatus(id);
  };

  showAddTodoModal = () => {
    this.setState({
      idEditTodoModalOpened: true,
      modalTitle: '添加新Todo'
    });
  };

  render() {
    const { catId, todos, addTodo, deleteTodo, modifyTodo } = this.props;
    return (
      <View>
        <Text> Todos-list </Text>
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
              <AtListItem />
              <AtListItem
                title="添加新Todo"
                thumb={add}
                onClick={this.showAddTodoModal.bind(this)}
              />
            </AtList>
          </View>
        </AtList>
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