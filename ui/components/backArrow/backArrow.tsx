import React, { useState } from 'react'
import { theme } from '../../styles/theme'
import { Link } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function BackArrow () {
  const [isHover, setIsHover] = useState(false)

  const backBtnStyle = {
    transition: '0.3s',
    color: isHover ? '#1976d2' : theme.palette.DarkGreen.main
  }

  return (
      <Link href="/">
        <span
          style={backBtnStyle}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <ArrowBackIcon fontSize="large" />
        </span>
      </Link>
  )
}
