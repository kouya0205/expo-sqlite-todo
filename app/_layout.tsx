import React from 'react'
import { Stack } from 'expo-router'
import "./global.css"
import { SQLiteProvider } from 'expo-sqlite'
import { migrateDbIfNeeded } from '../utils/db'

export default function HomeLayout() {
  return (
    <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
    </SQLiteProvider>
  )
}