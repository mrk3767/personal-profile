import React, { Component } from "react";
import RAFManager from "raf-manager";
import Proton from "proton-engine";

// Local replacement for particles-bg's "circle" type. The library hard-codes
// the particle velocity and drift, so this reproduces its circle effect with
// SPEED_FACTOR applied to both (0.5 = half speed).
const SPEED_FACTOR = 0.5;
const COLORS = ["#74b9ff", "#e84393", "#6c5ce7", "#00b894", "#fdcb6e", "#006266", "#1B1464"];

class CircleParticles extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.size = { width: 0, height: 0 };
    this.renderProton = this.renderProton.bind(this);
    this.resize = this.resize.bind(this);
  }

  componentDidMount() {
    this._oid = setTimeout(() => {
      const canvas = this.canvasRef.current;
      if (!canvas) return;
      canvas.getContext("2d").globalCompositeOperation = "darken";
      this.setCanvasSize(canvas);
      this.createProton(canvas);
      RAFManager.add(this.renderProton);
      window.addEventListener("resize", this.resize);
      // The header height changes as content loads, so watch for it.
      this._iid = setInterval(() => {
        if (canvas.clientHeight !== this.size.height || canvas.clientWidth !== this.size.width) {
          this.resize();
        }
      }, 100);
    }, 100);
  }

  componentWillUnmount() {
    try {
      clearTimeout(this._oid);
      clearInterval(this._iid);
      window.removeEventListener("resize", this.resize);
      RAFManager.remove(this.renderProton);
      this.proton && this.proton.destroy();
    } catch (e) {}
  }

  setCanvasSize(canvas) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.size = { width, height };
    canvas.width = width;
    canvas.height = height;
    return { width, height };
  }

  resize() {
    const canvas = this.canvasRef.current;
    if (!canvas || !this.proton) return;
    const { width, height } = this.setCanvasSize(canvas);
    this.crossZoneBehaviour.zone.width = width;
    this.crossZoneBehaviour.zone.height = height;
    this.proton.renderers[0].resize(width, height);
  }

  createProton(canvas) {
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(this.props.num || 20);
    emitter.damping = 0.008;

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(30, 600));
    emitter.addInitialize(
      new Proton.Velocity(new Proton.Span(0.5 * SPEED_FACTOR), new Proton.Span(0, 360), "polar")
    );
    emitter.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height)));

    const crossZoneBehaviour = new Proton.CrossZone(
      new Proton.RectZone(0, 0, canvas.width, canvas.height),
      "cross"
    );
    emitter.addBehaviour(crossZoneBehaviour);
    emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.35, 0.55)));
    emitter.addBehaviour(new Proton.Color(this.props.color || COLORS));
    emitter.addBehaviour(new Proton.RandomDrift(50 * SPEED_FACTOR, 50 * SPEED_FACTOR, 0.5));

    emitter.emit("once");
    this.proton.addEmitter(emitter);
    this.proton.addRenderer(new Proton.CanvasRenderer(canvas));

    this.crossZoneBehaviour = crossZoneBehaviour;
  }

  renderProton() {
    this.proton && this.proton.update();
  }

  render() {
    const style = {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: -1,
      top: 0,
      left: 0
    };
    return <canvas ref={this.canvasRef} style={style} />;
  }
}

export default CircleParticles;
