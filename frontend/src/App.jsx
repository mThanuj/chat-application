import {Route, Routes} from "react-router-dom";
import {Login} from './components/custom/exportComponents.js'
function App() {
    return (
        <>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<h1>Register page</h1>}/>
                <Route path={'/'} element={<h1>Home page</h1>}/>
            </Routes>
        </>
    )
}

export default App
