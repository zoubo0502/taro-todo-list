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
  }
  constructor() {
    super(...arguments);
    this.state = {
      newCatName: '',
      isModalOpened: false
    };
  }

  handleCatNameChange(newCatName) {
    this.setState({
      newCatName
    });
  }

  closeAddModal = () => {
    this.setState({
      isModalOpened: false
    });
  };

  showAddCatModal = () => {
    this.setState({
      isModalOpened: true
    });
  };

  toDeleteCategory = id => {
    this.props.deleteCategory(id);
    this.props.deleteTodos(id);
  };

  toAddCategory = () => {
    if (this.state.newCatName) {
      this.props.addCategory(this.state.newCatName);
      this.toSeeTodos(this.props.category[this.props.category.length - 1].id);
    }
    this.setState({
      newCatName: '',
      isModalOpened: false
    });
  };

  toSeeTodos = id => {
    Taro.setStorage({
      key: 'lastOpenCate',
      date: id
    })
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
              : '恭喜，已全部完成。';
            return (
              <AtSwipeAction
                key={cat.id}
                autoClose
                onClick={this.toDeleteCategory.bind(this, cat.id)}
                options={[
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
            <AtListItem key="blank"/>
            <AtListItem
              key="add-cat"
              title="添加新目录"
              thumb={add}
              onClick={this.showAddCatModal.bind(this)}
            />
          </AtList>
        </View>

        {/* MODAL */}
        <AtModal isOpened={this.state.isModalOpened}>
          <AtModalHeader>新增目录</AtModalHeader>
          <AtModalContent>
            <AtInput
              name="value"
              title="目录名称："
              type="text"
              placeholder="请输入新的目录名"
              value={this.state.newCatName}
              onChange={this.handleCatNameChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.closeAddModal.bind(this)}>取消</Button>
            <Button onClick={this.toAddCategory.bind(this)}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}
