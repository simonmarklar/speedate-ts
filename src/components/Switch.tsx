import React from 'react'

type Props = React.PropsWithChildren<{ value: GameScreenName }>

export default function Switch({ value, children }: Props) {
  let Component

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      child.type === Switch.Case &&
      child.props.value === value
    ) {
      Component = React.cloneElement(child)
    }
  })

  return <>{Component}</>
}

Switch.Case = function Case({ value, children }: Props) {
  return <>{children}</>
}
