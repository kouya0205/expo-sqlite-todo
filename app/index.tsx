import { SafeAreaView, View } from 'react-native';
import TodoList from '../components/todo-list';
import TodoForm from '../components/todo-form';

export default function index() {
  return (
    <SafeAreaView className='flex-1'>
      <TodoForm />
      <TodoList />
    </SafeAreaView>
  );
}