import React, { MouseEventHandler, PropsWithChildren } from 'react';

import './menu-button.css'

export default function MenuButton ({ title, description, children, onClick }: PropsWithChildren<{
  title: string,
  description: string,
  onClick: MouseEventHandler
}>) {

  return (
    <div className="button" onClick={onClick}>
      <h2 className="heading">{title}</h2>
      {children}
      <p className="description">{description}</p>
    </div>
  );
}
