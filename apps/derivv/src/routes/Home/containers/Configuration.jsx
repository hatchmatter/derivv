import { connect } from 'react-redux'
import { actions } from '@/modules/configuration'

import ConfigList from '@/components/ConfigList'

const { addDimensions, removeDimensions, updateDimensions } = actions

const mapStateToProps = (state) => ({
  dimensionsList: state.configuration.dimensionsList,
  originalImageDimensions: {
    width: state.originalImage?.width,
    height: state.originalImage?.height
  }
})

const mapActionCreators = {
  addDimensions,
  removeDimensions,
  updateDimensions
}

export default connect(mapStateToProps, mapActionCreators)(ConfigList)
