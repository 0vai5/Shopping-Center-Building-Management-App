import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, styles}:{
    title: string,
    handlePress?: () => void,
    styles?: string
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}>
      <View>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton