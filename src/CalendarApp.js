import React from 'react'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'
import AppRouter from './router/AppRouter'

const CalendarApp = () => {
  return (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
  )
}

export default CalendarApp