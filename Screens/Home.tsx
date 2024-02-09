import { View, Text, SafeAreaView, Button } from 'react-native'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { useState, useEffect } from 'react'

import dbConnection from '../db/SQLite'
import Alarm from '../Models/Alarm'
import TitleComponent from '../Components/TitleComponent'
import AlarmListComponent from '../Components/AlarmListComponent'

const Home = ({navigation, route}) => {
    const [alarms, setAlarms] = useState<Alarm[]>([])
    const isFocused = useIsFocused()

    useEffect(() => {
        dbConnection.getAlarms().then(result => setAlarms(result)).catch(error => console.log(error))
    }, [isFocused])

    const handleAlarmDelete = (alarm: Alarm) => {
        setAlarms(prev => {
            dbConnection.deleteAlarm(alarm).then().catch(error => console.log(error))
            return prev.filter(a => a.id !== alarm.id)
        })
    }

    return (
        <>
        <SafeAreaView style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <TitleComponent />
            <AlarmListComponent
                alarms={alarms}
                onEditClick={(alarm) => {
                    navigation.navigate('EditAlarm', {alarm})
                }}
                onDeleteClick={(alarm) => {handleAlarmDelete(alarm)}}
            />
            <Button 
                title={'Add new alarm'}
                onPress={() => {
                    navigation.navigate('EditAlarm', {
                        alarm: {
                            id: null,
                            title: null,
                            description: null,
                            rangeKm: null,
                            lat: null,
                            lon: null,
                            isActive: true,
                            isOneTime: false
                        }
                    })
                }}
            
            />
        </SafeAreaView>
    </>
    )
}
    
export default Home
    