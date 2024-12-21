import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import { useSQLiteContext } from 'expo-sqlite';

export default function TodoItem(todo: Todo) {
    const db = useSQLiteContext();
    async function deleteTodo() {
        await db.runAsync("DELETE FROM todos WHERE id = ?", todo.id!);
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };

  return (
    <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onLongPress={() => deleteTodo()} className='pb-2'>
    <View className={`${todo.color} rounded-md w-full flex items-start p-2`}>
    {/* タイトルと締め切り日 */}
    <View className="flex flex-row items-center justify-between w-full">
      <Text className="text-xl font-bold p-1 flex-1">{todo.title}</Text>
      <Text className="text-sm p-1 text-gray-500">
        {todo.limit_date
          ? new Date(todo.limit_date).toLocaleString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '未設定'}
      </Text>
    </View>

    {/* 内容 */}
    <Text className="text-sm p-1 text-gray-700">{todo.content}</Text>

    {/* フラグ状態を表示 */}
    {todo.flag === 1 ? (
      <Text className="text-sm p-1 text-gray-500">完了</Text>
    ) : (
      <Text className="text-sm p-1 text-gray-500">未完了</Text>
    )}    
  </View>
    </TouchableHighlight>
  )
}