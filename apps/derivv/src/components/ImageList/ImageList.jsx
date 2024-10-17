import React from 'react'
import ImageCaption from '@/components/ImageCaption'
import './ImageList.css'

import { LinearProgress } from '@material-ui/core';

export const Image = ({image, originalImage, processOne, processing}) => {
  if (processing === image.id) {
    return (
      <div className='images--image'>
        <div className='reprocessing' style={{height: image.metadata.height}}>
          <div style={{width: image.metadata.width * 1.5}}>
            <h4>Reprocessing...</h4>
            <LinearProgress />
          </div>
        </div>
        <ImageCaption
          processOne={processOne}
          originalImage={originalImage}
          image={image} />
      </div>
    )
  }

  return (
    <div className='images--image'>
      <div className='images--images'>
        <div className='images--regular'>
          <h5>Preview</h5>
          <img
            alt={image.name}
            width={image.metadata.width}
            height={image.metadata.height}
            src={URL.createObjectURL(image)} />
        </div>
      </div>
      <ImageCaption
        processOne={processOne}
        originalImage={originalImage}
        image={image} />
    </div>
  )
}

export const ImageList = ({images, originalImage, processOne, processing}) => (
  <div className='images--list'>
    {images.map((image, i) => (
      <Image
        key={image.id}
        image={image}
        processOne={processOne}
        processing={processing}
        originalImage={originalImage} />
    ))}
  </div>
)

export default ImageList
