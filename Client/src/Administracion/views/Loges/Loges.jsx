import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { opcionActual } from '../../../store/Administracion/administracionSlice';

export const Loges = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(opcionActual('Logs'));
  }, [dispatch]);
  return (
    <div>
      Logs
    </div>
  )
}
