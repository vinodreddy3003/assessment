import Assessment from "./Assessment"
import { jsQuizz } from "./constants"
function App() {
    return <Assessment questions={jsQuizz.questions} />
}

export default App
