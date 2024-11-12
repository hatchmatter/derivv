import React from 'react'
import AddIcon from '@material-ui/icons/Add'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import RemoveIcon from '@material-ui/icons/Remove'
import { TextField, IconButton, Tooltip } from '@material-ui/core';
import { toast, Toaster } from 'react-hot-toast'

import './Dimensions.css'

export const Dimensions = (props) => {
  const {
    dimensions,
    originalImageDimensions,
    error,
    onAddClick,
    onRemoveClick,
    onChange,
    lastItem,
    onlyItem
  } = props
  const handleRemoveClick = () => { onRemoveClick(dimensions.id) }
  const handleChange = (e) => {
    onChange({
      ...dimensions,
      [e.target.name]: parseInt(e.target.value, 10) || ''
    })
  }

  const handleAddClick = () => {
    onAddClick()
  }

  const renderAddButton = () => (
    <IconButton
      className='add-dimensions'
      onClick={handleAddClick}
      color='primary'
      disabled={!dimensions.width && !dimensions.height}
      style={buttonStyles}>
      <AddIcon />
    </IconButton>
  )

  const buttonStyles = {padding: 0, width: 30, height: 30}

  const widthError = originalImageDimensions?.width && (originalImageDimensions.width < dimensions.width)
  const heightError = originalImageDimensions?.height && (originalImageDimensions.height < dimensions.height)

  return (
    <li className='dimensions'>
      <TextField
        style={{marginRight: 5}}
        label='width in px'
        name='width'
        error={widthError}
        helperText={widthError && `${dimensions.width} > original: ${originalImageDimensions.width}w`}
        onChange={handleChange}
        value={dimensions.width}
        type='number' />
      <TextField
        label='height in px'
        name='height'
        error={heightError}
        helperText={heightError && `${dimensions.height} > original: ${originalImageDimensions.height}h`}
        onChange={handleChange}
        value={dimensions.height}
        type='number' />
      <IconButton
        className='remove-dimensions'
        disabled={onlyItem}
        style={buttonStyles}
        color='primary'
        onClick={handleRemoveClick}>
        <RemoveIcon />
      </IconButton>
      {lastItem && renderAddButton()}
      {error && <Tooltip title={error}><ErrorOutlineOutlinedIcon color='error' style={{verticalAlign: 'middle'}} /></Tooltip>}
      <Toaster />
    </li>
  )
}

export default Dimensions
