import { createThreeScene } from './createThreeScene'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const threeCanvas = createThreeScene(app.clientWidth, app.clientHeight)
app.appendChild(threeCanvas)
