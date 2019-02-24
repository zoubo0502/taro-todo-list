import './category.scss';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  addCategory,
  deleteCategory,
  modifyCategory
} from '../../actions/category';
import { deleteTodos } from '../../actions/todos';
import CatTop from './cat-top';
import CatList from './cat-list';

@connect(
  ({ category, todos }) => ({ category, todos }),
  { addCategory, deleteCategory, modifyCategory, deleteTodos }
)
export default class Category extends Taro.Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
  render() {
    const { category, todos, deleteCategory, addCategory,  deleteTodos} = this.props;
    return (
      <View className="category">
        <CatTop catTotal={category.length} />
        <CatList
          category={category}
          todos={todos}
          deleteCategory={deleteCategory}
          deleteTodos={deleteTodos}
          addCategory={addCategory}
        />
      </View>
    );
  }
}
