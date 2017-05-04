import React from 'react'

const SingleCenterColumnLayout = ({children, style, ...otherProps}) => (
  <div style={{width: 980, margin: 'auto', ...style}} {...otherProps}>{children}</div>
)

export default SingleCenterColumnLayout