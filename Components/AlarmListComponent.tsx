import { FlatList } from 'react-native-gesture-handler'
import { Alarm } from '../Models/Alarm'
import { AlarmItemComponent } from './AlarmItemComponent'
import { SwipeListView } from 'react-native-swipe-list-view'
import {
  View,
  Text,
  Dimensions,
  Animated,
  ViewStyle,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { useState } from 'react'

interface AlarmListComponentProps {
  alarms: Alarm[]
  alarmListStyle: ViewStyle
  handleEditAlarm: (alarm: Alarm) => void
  handleDeleteAlarm: (alarm: Alarm) => void
}

const AlarmListComponent = ({
  alarms,
  alarmListStyle,
  handleEditAlarm,
  handleDeleteAlarm,
}: AlarmListComponentProps) => {
  return (
    <FlatList
      style={[styles.alarmListStyle, alarmListStyle]}
      data={alarms}
      renderItem={({ item }) => (
        <AlarmItemComponent
          alarm={item}
          handleEditAlarm={(alarm) => handleEditAlarm(alarm)}
          handleDeleteAlarm={(alarm) => handleDeleteAlarm(alarm)}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  alarmListStyle: {},
})

export default AlarmListComponent
