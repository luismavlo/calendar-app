import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route
  } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import CalendarScreen from '../components/calendar/CalendarScreen'
import { startChecking } from '../redux/actions/auth'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if( checking ){
        return <h5>Espere...</h5>
    }

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={
                <PublicRoute isAuthenticated={ !!uid }>
                    <LoginScreen />
                </PublicRoute>
            }/>

            <Route path='/' element={
                <PrivateRoute isAuthenticated={ !!uid }>
                    <CalendarScreen />
                </PrivateRoute>
            }/>

            <Route path='*' element={<CalendarScreen />} />
            
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter