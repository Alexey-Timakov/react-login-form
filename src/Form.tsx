import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'
import "./Form.scss";
import Select from './Select';
import Success from './Success';
import { selectVariants } from './selectVariants';

export default function Form() {
  const classNames = require("classnames");

  const submitButton: RefObject<HTMLInputElement> = useRef(null);
  const submitBtn = submitButton.current;

  const [isButtonActive, toggButtonActivity] = useState<boolean>(false);
  const [userMail, setUserMail] = useState<string>("");
  const [isEmailOk, toggleEmailOk] = useState<boolean>(true);
  const [userPass, setUserPass] = useState<string>("");
  const [isPassOk, togglePassOk] = useState<boolean>(true);
  const [isChecked, setCheckbox] = useState<boolean>(false);
  const [isVariantToggled, setToggleValue] = useState<boolean>(false);
  const [selectedVariant, setSelectedVariant] = useState<number>(0); // for Select component
  const [isSelectedOk, setSelectedOk] = useState<boolean>(true);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const toggleBtnClasses = classNames({
    "toggle__button-container": true,
    "active": isVariantToggled
  });

  const submitButtonClasses = classNames({
    "login-form__submit-button": true,
    "active": isButtonActive
  });

  const inputEmailErrorClasses = classNames({
    "error-description": true,
    "email-error": !isEmailOk,
  });

  const inputPassErrorClasses = classNames({
    "error-description": true,
    "pass-error": !isPassOk
  });

  const changeUserMail = (event: ChangeEvent<HTMLInputElement>) => {
    const newUserMail = event.target.value;
    setUserMail(newUserMail);
  };

  const changeUserPass = (event: ChangeEvent<HTMLInputElement>) => {
    const newUserPass = event.target.value;
    setUserPass(newUserPass);
  };

  const setCheckboxChecked = () => {
    setCheckbox(!isChecked);
  }

  const setToggle = () => {
    setToggleValue(!isVariantToggled);
  }

  const checkUserMail = (): boolean => {
    const result = userMail.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (result) {
      toggleEmailOk(true)
    } else (
      toggleEmailOk(false)
    )
    return result ? true : false
  }

  const checkUserPass = (): boolean => {
    const result = userPass.match(/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/);
    if (result) {
      togglePassOk(true)
    } else {
      togglePassOk(false)
    }
    return result ? true : false
  }

  const checkSeceltedVariant = (): boolean => {
    const result = (selectedVariant === selectVariants.length - 1 || selectedVariant === selectVariants.length - 2);
    if (result) {
      setSelectedOk(true)
    } else {
      setSelectedOk(false)
    }
    return result ? true : false
  }

  const checkIsValuesFilled = (): boolean => {
    return userMail.length !== 0
      && userPass.length !== 0
      && isChecked
      && isVariantToggled
  }

  const checkValues = (): boolean => {
    let result: boolean = true;
    if (!checkUserMail()) result = false;
    if (!checkUserPass()) result = false;
    if (!checkSeceltedVariant()) result = false;
    return result
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkValues()) {
      setSuccess(true);
    }
  }

  useEffect(() => {
    if (checkIsValuesFilled()) {
      submitBtn?.removeAttribute("disabled");
      toggButtonActivity(true);
    }
    else {
      submitBtn?.setAttribute("disabled", "");
      toggButtonActivity(false);
    }
  })

  return (
    <div className='login-form__wrapper'>
      <form className='login-form__form' onSubmit={(e) => submitForm(e)}>

        <div className='login-form__user-mail'>
          <label htmlFor="userMail">User mail</label>
          <input type="text" name="userMail" id="userMail" placeholder='Enter email' value={userMail} onChange={changeUserMail} />
          <p className={inputEmailErrorClasses}>Incorrect email format!</p>
        </div>

        <div className='login-form__user-pass'>
          <label htmlFor="userPass">Password</label>
          <input type="password" name="userPass" id="userPass" placeholder='Enter password' value={userPass} onChange={changeUserPass} />
          <p className={inputPassErrorClasses}>Password should contain at least 8 symbols (minimun 2 in upper case) and 2 digits</p>
        </div>


        <div className='login-form__check-boxes'>
          <div className='check-box__wrapper'>
            <div className='check-box__tick' onClick={setCheckboxChecked}>{isChecked && <i className='icon-checked'></i>}</div>
            <div className='check-box__text'>This guy is awesome!</div>
          </div>
        </div>

        <div className='login-form__toggles'>
          <div className='toggle__wrapper'>
            <div className={toggleBtnClasses}>
              <input type="checkbox" defaultChecked={isVariantToggled} onChange={setToggle} />
            </div>
            <div className='toggle__text'>I want to hire him</div>
          </div>
        </div>

        <div className='login-form__selectors'>
          <Select
            items={selectVariants}
            selectedVariant={selectedVariant}
            isSelectedOk={isSelectedOk}
            setSelectedVariant={setSelectedVariant}
          />
        </div>

        <input ref={submitButton} className={submitButtonClasses} disabled type="submit" value="Here we go!" />
      </form>

      {isSuccess && <Success isSuccess={isSuccess} setSuccess={setSuccess} />}
    </div>
  )
}
