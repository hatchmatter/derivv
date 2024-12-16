import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'

const ConfigReset = () => {
  const reset = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <Button color='primary' onClick={reset} style={{marginLeft: '2rem'}}>
      Reset
    </Button>
  )
}

export default ConfigReset