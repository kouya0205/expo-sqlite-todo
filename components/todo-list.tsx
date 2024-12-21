import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import TodoItem from './ui/todo-item';

export default function TodoList() {
    const db = useSQLiteContext();
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
       async function getAllTodos() {
        const res = await db.getAllAsync<Todo>("SELECT * FROM todos");
        setTodos(res);
    }
    getAllTodos();
    }, [todos]);
  return (
        <ScrollView
        contentContainerClassName='p-2'
        >
          <Text className='text-2xl'>タスク一覧</Text>
        {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
        ))}
        </ScrollView>
  )
}