import React from 'react'
import 'blueimp-canvas-to-blob'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '@material-ui/core';

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, processAll, errors} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    const configs = dimensionsList.filter(d => d.height || d.width)

    if (configs.length > 0) {
      processAll(image, configs)
    }
  }

  React.useEffect(() => {
    if (errors.length > 0) {
      for (const error of errors) {
        toast.error(error.message)
      }
    }
  }, [errors])


  return (
    <>
      <Button
        disabled={disabled}
        color='primary'
        variant='contained'
        onClick={handleClick}
        style={{width: '100%'}}>
        Create Derivative Images
      </Button>
      <Toaster />
    </>
  )
}

export default ImageProcessButton
