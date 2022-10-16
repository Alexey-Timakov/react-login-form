import React from 'react'
import "./Success.scss";

export interface ISuccess {
  isSuccess: boolean;
  setSuccess: (status: boolean) => void;
}

export default function Success({ isSuccess, setSuccess }: ISuccess) {
  const modalClick = () => {
    setSuccess(false);
  }

  return (
    <div className='modal-window__wrapper'>
      <div className='modal-window__body'>
        <input type="button" value="DEAL!!!" onClick={modalClick} />
      </div>
    </div>
  )
}
