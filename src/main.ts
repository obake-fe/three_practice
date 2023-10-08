import './style.css'
import { createGalaxyScene } from './createGalaxyScene'

const app = document.querySelector<HTMLDivElement>('#app')!
const threeCanvas = createGalaxyScene(app.clientWidth, app.clientHeight)
app.appendChild(threeCanvas)
