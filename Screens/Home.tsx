import { View, Text, SafeAreaView, Button, StyleSheet } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useState, useEffect } from 'react'

import dbConnection from '../db/SQLite'
import { Alarm, AlarmLocation } from '../Models/Alarm'
import TitleComponent from '../Components/TitleComponent'
import AlarmListComponent from '../Components/AlarmListComponent'
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from '../NavigationProps/NavProps'
import { startBackgroundTask } from '../BackgroundTask/BackgroundTask'
import {
  registerForPushNotificationsAsync,
  scheduleTestNotification,
} from '../BackgroundTask/PushNotification'
import TopBarComponent from '../Components/TopBarComponent'



type HomeProps = {
  route: HomeScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const isFocused = useIsFocused()

  useEffect(() => {
    dbConnection
      .getAlarms()
      .then((result) => {
        setAlarms(result)
      })
      .catch((error) => console.log(error))
  }, [isFocused])

  useEffect(() => {
    setupBackgroundTask()
  }, [])

  const setupBackgroundTask = async () => {
      registerForPushNotificationsAsync().then(result => {
        if(!result)
          console.log('Push notification register failed')
        // else {
        //   scheduleTestNotification()
        // }
      }).catch(e => {
        console.log('Push notification failed', e)
      })

      startBackgroundTask().then(result => {
        if(!result)
          console.log('Failed on starting background task')
      }).catch(e => {
        console.log('Failed on starting background task', e)
      })
  }

  const handleAlarmDelete = (alarm: Alarm) => {
    setAlarms((prev) => {
      dbConnection
        .deleteAlarm(alarm)
        .then()
        .catch((error) => console.log(error))
      return prev.filter((a) => a.id !== alarm.id)
    })
  }

  return (
      <SafeAreaView
        style={styles.main}
      >
        <TopBarComponent navigation={navigation} />        
        <AlarmListComponent
          alarms={alarms}
          onEditClick={(alarm) => {
            navigation.navigate('EditAlarm', { alarm })
          }}
          onDeleteClick={(alarm) => {
            handleAlarmDelete(alarm)
          }}
        />
        <Button
          title={'Add new alarm'}
          onPress={() => {
            navigation.navigate('EditAlarm', {
              alarm: null,
            })
          }}
        />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
    }
})

export default Home
