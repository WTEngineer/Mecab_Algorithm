import SvgIcon from '@material-ui/core/SvgIcon'
import React from 'react'

function MuiIcon(props) {
  return (
    <SvgIcon {...props}>
      <path fill="#00B0FF" d="M0 8.66V0l7.5 4.33v2.887l-5-2.887v5.773z" />
      <path
        fill="#0081CB"
        d="M7.5 4.33L15 0v8.66l-5 2.887-2.5-1.444 5-2.886V4.33l-5 2.887z"
      />
      <path fill="#00B0FF" d="M7.5 10.103v2.887l5 2.887V12.99z" />
      <path
        d="M12.5 15.877l7.5-4.33V5.773l-2.5 1.444v2.886l-5 2.887v2.887zm5-11.547V1.443L20 0v2.887L17.5 4.33z"
        fill="#0081CB"
      />
    </SvgIcon>
  )
}

export default MuiIcon
