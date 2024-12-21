import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type DatePickerProps = {
    setLimit: (limit: string) => void;
    };

// アプリ
export default function DatePicker({ setLimit }: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(Platform.OS === 'ios');
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(Platform.OS === 'ios');
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  // 年月日変更時に呼ばれる
  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDatePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
    setLimit(currentDate.toISOString());
  };

  // 時分変更時に呼ばれる
  const onTimeChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setTimePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
    setLimit(currentDate.toISOString());
  };  
  console.log(date);

  // UI
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      { Platform.OS === 'android' &&
        <TouchableOpacity 
          onPress={() => {setDatePickerVisible(true)}} 
          style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 16 }}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      }
      { Platform.OS === 'android' &&
          <TouchableOpacity 
            onPress={() => {setTimePickerVisible(true)}} 
            style={{ borderWidth: 1, borderColor: '#000', padding: 10, marginBottom: 20, borderRadius: 5 }}
          >
            <Text style={{ fontSize: 16 }}>{date.toLocaleTimeString('ja-JP', timeOptions)}</Text>
          </TouchableOpacity>
      }

      { datePickerVisible &&
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
          locale="ja-JP"
          style={{marginBottom: 20}}
        />
      }
      { timePickerVisible &&
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
          locale="ja-JP"
          style={{marginBottom: 20}}
        />
      }

      <Text>{date.toLocaleDateString()} {date.toLocaleTimeString('ja-JP', timeOptions)}</Text>
    </View>
  );
};