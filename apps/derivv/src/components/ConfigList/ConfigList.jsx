import React from 'react'
import Dimensions from '@/components/Dimensions'
import './ConfigList.css'

export const ConfigList = (props) => {
  const {dimensionsList, addDimensions, removeDimensions, updateDimensions, originalImageDimensions} = props

  const renderDimensions = (d, i) => {
    const list = dimensionsList
    const onlyItem = dimensionsList.length === 1
    let lastItem = false

    if (list[list.length - 1].id === d.id) { lastItem = true }

    let error = null

    if (originalImageDimensions.width && originalImageDimensions.height) {  
      if (d.width > originalImageDimensions.width || d.height > originalImageDimensions.height) {
        error = `Cannot upscale original image. Desired dimensions: ${d.width}w x ${d.height}h; original dimensions: ${originalImageDimensions.width}w x ${originalImageDimensions.height}h`
      }
    }

    return (
      <Dimensions
        key={i}
        dimensions={d}
        originalImageDimensions={originalImageDimensions}
        error={error}
        lastItem={lastItem}
        onlyItem={onlyItem}
        onAddClick={addDimensions}
        onChange={updateDimensions}
        onRemoveClick={removeDimensions} />
    )
  }

  return (
    <ol className='configure--list'>
      {dimensionsList.map(renderDimensions)}
    </ol>
  )
}

export default ConfigList
