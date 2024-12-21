import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type ColorPickerProps = {
  setColor: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ setColor }) => {
  const [selectedColor, setSelectedColor] = useState<string>('');

  const colors = ["bg-red-300", "bg-green-300", "bg-blue-300", "bg-yellow-200", "bg-pink-300", "bg-purple-300", "bg-indigo-300", "bg-gray-300"];  

  const handleColorSelect = (color: string) => {
    setSelectedColor(color); // 内部で選択した色を保存
    setColor(color); // 親コンポーネントに色を渡す
  };

  return (
    <View className='p-4 items-center'>
      <View className='flex flex-row flex-wrap'>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            className={`${color} rounded-sm size-10 m-2 border-2 ${selectedColor === color ? 'border-gray-500' : 'border-transparent'}`}
            onPress={() => handleColorSelect(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  colorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorBorder: {
    borderColor: 'black',
  },
  selectedColorText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default ColorPicker;
