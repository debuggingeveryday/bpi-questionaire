import * as React from 'react';

interface IProps {
  show: boolean;
  children: React.ReactNode;
}

const Modal: React.FunctionComponent<IProps> = ({ show, children }): JSX.Element => {
  return (
    <div className={` ${!show ? 'hidden' : ''}`}>
      {children}
    </div>
  );
};

export default Modal;
