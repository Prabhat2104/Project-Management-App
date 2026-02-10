import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from '../context/AuthContext.jsx'
// import { ProjectProvider } from '../context/ProjectContext.jsx'
import { TaskProvider } from '../context/TaskContext.jsx'
import store from './app/store.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store = {store}>
      {/* <AuthProvider> */}
        {/* <ProjectProvider> */}
        {/* <TaskProvider> */}
        <App />
        {/* </TaskProvider> */}
        {/* </ProjectProvider> */}
      {/* </AuthProvider> */}
      </Provider>
    </BrowserRouter>
)
