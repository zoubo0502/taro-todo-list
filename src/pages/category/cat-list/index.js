import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import catalog from '../assets/salescatalog.svg';
import add from '../assets/add.svg';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput,
  AtSwipeAction,
  AtList,
  AtListItem
} from 'taro-ui';
import './index.scss';

export default class CatList extends Taro.Component {
  static defaultProps = {
    category: [],
    todos: []
  };
  constructor() {
    super(...arguments);
    this.state = {
      editCateId: 0,
      editCatName: '',
      isModalOpened: false
    };
  }

  handleCatNameChange(editCatName) {
    this.setState({
      editCatName
    });
  }

  closeAddModal = () => {
    this.setState({
      isModalOpened: false
    });
  };

  showCatModalToAdd = () => {
    this.setState({
      isModalOpened: true,
      modalTitle: '添加新目录'
    });
  };

  toOperateCategory = (id, event) => {
    if (event.text == '编辑') {
      this.setState({
        editCateId: id,
        isModalOpened: true,
        modalTitle: '编辑目录名'
      });
    }
    if (event.text == '删除') {
      this.props.deleteCategory(id);
      this.props.deleteTodos(id);
    }
  };

  toSaveCategory = () => {
    if (this.state.editCatName) {
      if (this.state.editCateId) {
        this.props.modifyCategory(this.state.editCateId, this.state.editCatName);
        Taro.redirectTo({
          url: '/pages/category/category'
        });
      } else {
        this.props.addCategory(this.state.editCatName);
        this.toSeeTodos(this.props.category[this.props.category.length - 1].id);
      }
    }
    this.setState({
      isModalOpened: false,
      editCateId: 0,
      editCatName: ''
    });
  };

  toSeeTodos = id => {
    Taro.setStorage({
      key: 'lastOpenCate',
      data: id
    });
    Taro.redirectTo({
      url: `/pages/todos/todos?catId=${id}`
    });
  };

  render() {
    const { category, todos } = this.props;
    {
      category.forEach(cat => {
        let notFinish = 0;
        let finished = 0;
        todos.forEach(todo => {
          if (todo.catId == cat.id) {
            if (todo.status) {
              finished++;
            } else {
              notFinish++;
            }
          }
        });
        cat.notFinish = notFinish;
        cat.finished = finished;
      });
    }
    return (
      <View className="cat-list">
        <AtList>
          {category.map(cat => {
            let note = cat.notFinish
              ? `已完成${cat.finished},未完成${cat.notFinish}！`
              : cat.finished
              ? '恭喜，已全部完成。'
              : '点击添加Todos';
            return (
              <AtSwipeAction
                key={cat.id}
                autoClose
                onClick={this.toOperateCategory.bind(this, cat.id)}
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
                  key={cat.id}
                  title={cat.name}
                  note={note}
                  extraText="左滑编辑"
                  arrow="right"
                  thumb={catalog}
                  onClick={this.toSeeTodos.bind(this, cat.id)}
                />
              </AtSwipeAction>
            );
          })}
        </AtList>
        <View className="add-list">
          <AtList>
            <AtListItem key="blank" />
            <AtListItem
              key="add-cat"
              title="添加新目录"
              thumb={add}
              onClick={this.showCatModalToAdd.bind(this)}
            />
          </AtList>
        </View>

        {/* MODAL */}
        <AtModal isOpened={this.state.isModalOpened}>
          <AtModalHeader>{this.state.modalTitle}</AtModalHeader>
          <AtModalContent>
            <AtInput
              name="value"
              title="目录名称："
              type="text"
              placeholder="请输入目录名称"
              value={this.state.editCatName}
              onChange={this.handleCatNameChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeAddModal.bind(this)}>取消</Button>
            <Button onClick={this.toSaveCategory.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}
