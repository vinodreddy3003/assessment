import Assessment from "./Components/Assessment"
import {jsQuizz} from "./constants.json"
import "./App.css"
function App() {
    return <Assessment questions={jsQuizz.questions} />
}

export default App
