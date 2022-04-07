import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';

const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClic = () =>{
        dispatch(uiOpenModal());
    }

  return (
    <button
        className='btn btn-primary fab'
        onClick={handleClic}    
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}

export default AddNewFab