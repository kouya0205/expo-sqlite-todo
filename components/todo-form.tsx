import { View, Text, TextInput, TouchableHighlight, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSQLiteContext } from 'expo-sqlite'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import ColorPicker from './colorPicker';
import DatePicker from './datePicker';

export default function TodoForm() {
    const db = useSQLiteContext();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [color, setColor] = useState<string>('');
    const [limit, setLimit] = useState<string>(new Date().toISOString());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const spin = useSharedValue(0);

    const animatedStyleHorizontal = useAnimatedStyle(() => ({
        transform: [{ rotate: `${spin.value}deg` }],
        opacity: isOpen ? 0 : 1, // 開いた状態では縦線を消す
      }));
    
      const animatedStyleVertical = useAnimatedStyle(() => ({
        transform: [{ rotate: `${spin.value}deg` }],
      }));

  return (
    <View className='p-2 w-full'>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className='relative flex flex-row'>
            <TextInput onChangeText={setTitle} value={title} className='p-2 pr-8 flex-1 border-2 border-gray-300 rounded-md' placeholder='Title' />
            <Pressable
                className='absolute right-2 top-[25%]'
                  onPress={() => {
                    setIsOpen(!isOpen);
                    spin.value = withSpring(isOpen ? 0 : 90);
                  }}>
                    <View style={styles.iconContainer}>
                      <Animated.View style={[styles.horizontalLine, animatedStyleHorizontal]} />
                      <Animated.View style={[styles.verticalLine, animatedStyleVertical]} />
                    </View>
                </Pressable>
        </View>
        {isOpen && (
        <View className='px-2 border h-[300px]'>
            <TextInput onChangeText={setContent} value={content} className='p-4 border-2 border-gray-300 rounded-md' placeholder='Content' />
            <ColorPicker setColor={setColor} />
            <DatePicker setLimit={setLimit} />
        </View>
        )}
        </KeyboardAvoidingView>
        <TouchableHighlight 
            onPress={async () => {
                if(!title) return;
                console.log(title, content, color, limit);
                try {
                // const res = await db.runAsync("DROP TABLE IF EXISTS todos");
                //     console.log("res", res);
                //     await db.execAsync(`
                //         CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, content TEXT, color TEXT NOT NULL, limit_date TEXT, flag INTEGER DEFAULT 0);
                //     `);
                    
                const res = await db.runAsync("INSERT INTO todos (title, content, color, limit_date, flag) VALUES (?, ?, ?, ?, ?)", [title, content, color, limit, 0]);
                console.log("res", res);
                } catch (e) {
                    console.log(e);
                }
                setTitle('');
                setContent('');
                setColor('');
                setLimit('');
            }}
            activeOpacity={0.5}
            underlayColor={`${!title ? null : '#002855'}`}
        className={
            ` rounded-md p-2 ${!title ? 'bg-gray-300' : 'bg-blue-500'}`
        }>
            <Text className='text-white text-center p-1'>保存</Text>
        </TouchableHighlight>
    </View>
    
  )
}

const styles = StyleSheet.create({
    iconContainer: {
      width: 16,
      height: 16,
      position: 'relative',
    },
    horizontalLine: {
      position: 'absolute',
      top: '50%',
      left: 0,
      width: '100%',
      height: 2,
      backgroundColor: 'black',
      transform: [{ translateY: -1 }],
    },
    verticalLine: {
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 2,
      height: '100%',
      backgroundColor: 'black',
      transform: [{ translateX: -1 }],
    },
  });