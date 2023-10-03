import { createThreeScene } from './createThreeScene'
import './style.css'
import {createGalaxyScene} from "./createGalaxyScene";

const app = document.querySelector<HTMLDivElement>('#app')!
// const threeCanvas = createThreeScene(app.clientWidth, app.clientHeight)
const threeCanvas = createGalaxyScene(app.clientWidth, app.clientHeight)
app.appendChild(threeCanvas)
