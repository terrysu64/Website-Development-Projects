import initTilt from "./tilt";
import initSr from "./sr";
import { addResume } from "./utils";
import resume from "../assets/resume.pdf";
import initGradient from "./waveGradient"

export default function initApp() {
  initSr();
  initTilt();
  addResume(resume);
  var gradient = new Gradient();
  gradient.initGradient('#gradient-canvas');
}
 