import React, { useState } from 'react'
import { Variant } from "./selectVariants";
import "./Select.scss";

export interface ISelect {
  selectedVariant: number;
  items: Variant[];
  isSelectedOk: boolean;
  setSelectedVariant: (id: number) => void;
}

export default function Select({ items, selectedVariant, isSelectedOk, setSelectedVariant }: ISelect) {
  const classNames = require("classnames");
  const [isVariantsShown, toggleVariants] = useState<boolean>(false);

  const selectVariant = (id: number): void => {
    setSelectedVariant(id);
    toggleVariants(false);
  }

  const inputSelectedErrorClasses = classNames({
    "error-description": true,
    "select-error": !isSelectedOk
  });

  return (
    <div className='selector__wrapper'>
      <label className='selector__label' htmlFor='selector'>And I will pay him</label>
      <div className='selector__selector' onClick={() => toggleVariants(!isVariantsShown)}>{items[selectedVariant].text}
        < i className='icon-arrow-down'></i>
      </div>
      <p className={inputSelectedErrorClasses}>Lets think about it one more time ))</p>
      {isVariantsShown &&
        <div className='selector__variants'>
          {items.map(item => {
            const variantClasses = classNames({
              "variant": true,
              "active": item.isActive
            })
            return (
              <div key={item.id} className={variantClasses} onClick={() => selectVariant(item.id)}>
                {item.text}
                {(item.id === selectedVariant) && < i className='icon-checked'></i>}
              </div>
            )
          })}
        </div>
      }
    </div >
  )
}
