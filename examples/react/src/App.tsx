import ImageList from './ImageList'
import ImagesUpload from './ImagesUpload'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Upload</h1>
      <ImagesUpload />
      <h1>List</h1>
      <ImageList />
    </div>
  )
}

export default App
