import React, { useState } from 'react';
import Navbar from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { uiOpenModal } from '../../redux/actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive } from '../../redux/actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';


const localizer = momentLocalizer(moment);

moment.locale('es');


const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.calendar );


  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = (e) =>{
    dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) =>{
    dispatch(eventSetActive(e));
  }

  const onViewChange = e =>{
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const onSelectSlot = e =>{
    dispatch( eventClearActiveEvent() );
  }

  const eventStyleGetter = ( event,start,end,isSelected ) =>{

    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      displey: 'block',
      color: 'white'

    }

    return {
      style
    }
  }

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        onSelectSlot={ onSelectSlot }
        selectable={ true }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      
      {
        activeEvent && <DeleteEventFab />
      }
      

      <CalendarModal />
    </div>
  )
}

export default CalendarScreen