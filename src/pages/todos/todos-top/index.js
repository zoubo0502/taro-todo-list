import Taro from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import top from '../assets/todo-top.jpg';
import edit from '../assets/edit.svg';
import './index.scss';
import del from '../assets/delete.svg';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput
} from 'taro-ui';

export default class TodosTop extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isDeleteCatModelOpened: false,
      isEditCatModelOpened: false,
      categoryName: this.props.catName
    };
  }

  toEditCategory = id => {
    this.props.modifyCategory(id, this.state.categoryName);
    this.setState({
      isEditCatModelOpened: false
    });

  };

  toDeleteCategory = id => {
    this.props.deleteCategory(id);
    this.props.deleteTodos(id);
  };

  toOpenDeleteModel = () => {
    this.setState({
      isDeleteCatModelOpened: true
    });
  };

  toOpenEditModel = () => {
    this.setState({
      isEditCatModelOpened: true,
      categoryName: this.props.catName
    });
  };

  toCloseDeleteModel = () => {
    this.setState({
      isDeleteCatModelOpened: false
    });
  };

  handleCatNameChange = categoryName => {
    this.setState({
      categoryName
    });
  };

  toCloseEditModel = () => {
    this.setState({
      isEditCatModelOpened: false
    });
  };


  render() {
    const { catId } = this.props;
    return (
      <View className="todos-top">
        <Image className="img" src={top} />
        <View className="catalog">
          <View className="name" onClick={this.toOpenEditModel.bind(this)}>
            <Text className="text">{this.state.categoryName}</Text>
            <Image className="edit-icon" src={edit} />
          </View>
          <Image
            className="delete-icon"
            src={del}
            onClick={this.toOpenDeleteModel.bind(this)}
          />
        </View>

        {/* delete category modal */}
        <AtModal isOpened={this.state.isDeleteCatModelOpened}>
          <AtModalHeader>确认删除目录?</AtModalHeader>
          <AtModalContent>
            删除"{this.state.catName}"目录则该目录下所有todo事项将被删除！
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.toCloseDeleteModel.bind(this)}>取消</Button>
            <Button onClick={this.toDeleteCategory.bind(this, catId)}>
              确定
            </Button>
          </AtModalAction>
        </AtModal>

        {/* edit category modal */}
        <AtModal isOpened={this.state.isEditCatModelOpened}>
          <AtModalHeader>修改目录名</AtModalHeader>
          <AtModalContent>
            <AtInput
              name="value"
              title="目录名称："
              type="text"
              value={this.state.categoryName}
              focus={this.state.isEditCatModelOpened}
              onChange={this.handleCatNameChange.bind(this)}
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.toCloseEditModel.bind(this)}>取消</Button>
            <Button onClick={this.toEditCategory.bind(this, catId)}>
              确定
            </Button>
          </AtModalAction>
        </AtModal>
      </View>
    );
  }
}
