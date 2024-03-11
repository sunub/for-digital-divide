const { Component } = React;
const { Motion, spring } = ReactMotion;

const getDistance = (x1, x2, y1, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const getAngle = (x1, x2, y1, y2) =>
  (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

const getLineData = (start, end, width) => {
  let x1 = ((((start - 1) % 3) * 33.3333 + 16.66666) * width) / 100;
  let y1 = ((Math.floor((start - 1) / 3) * 33.3333 + 16.6666) * width) / 100;
  let x2, y2;
  if (typeof end === 'number') {
    x2 = ((((end - 1) % 3) * 33.3333 + 16.66666) * width) / 100;
    y2 = ((Math.floor((end - 1) / 3) * 33.3333 + 16.6666) * width) / 100;
  } else {
    x2 = end.x;
    y2 = end.y;
  }
  return {
    x: x1,
    y: y1,
    distance: getDistance(x1, x2, y1, y2),
    angle: getAngle(x1, x2, y1, y2),
  };
};

const PatternPath = ({ path, width, mouseX, mouseY, elemPos, error }) => {
  if (!path.length) return null;
  let lines = [];
  let l = path.length - 1;
  for (let i = 0; i < l; i++) {
    let { x, y, distance, angle } = getLineData(path[i], path[i + 1], width);
    lines.push(
      <div
        style={{
          top: `calc(${y}px)`,
          left: `calc(${x}px)`,
          width: `${distance}px`,
          transform: `rotate(${angle}deg)`,
        }}
      />,
    );
  }
  if (!error) {
    let { x, y, distance, angle } = getLineData(
      path[path.length - 1],
      {
        x: mouseX - elemPos.x,
        y: mouseY - elemPos.y,
      },
      width,
    );

    lines.push(
      <div
        style={{
          top: `calc(${y}px)`,
          left: `calc(${x}px)`,
          width: `${distance}px`,
          transform: `rotate(${angle}deg)`,
        }}
      />,
    );
  }

  return <div className={`path${error ? ' error' : ''}`}>{lines}</div>;
};

let correctPattern = [2, 4, 8, 6];

class PatternPoint extends Component {
  constructor(props) {
    super(props);
    this.elem = null;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
  }

  updateParams() {
    if (!this.props.animated || !this.elem) return;

    let { top, left } = this.elem.getBoundingClientRect();

    this.top = top;
    this.left = left;

    this.width = this.elem.offsetWidth;
    this.height = this.elem.offsetHeight;
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateParams.bind(this));
  }

  componentWillReceiveProps({ animated }) {
    if (animated) {
      setTimeout(this.updateParams.bind(this), 500);
    }
  }

  mouseMove() {
    if (
      this.props.pageX > this.left &&
      this.props.pageY > this.top &&
      this.props.pageX < this.left + this.width &&
      this.props.pageY < this.top + this.height
    ) {
      this.props.onMouseOver(this.props.id);
    }
  }

  render() {
    let { onMouseOver, onMouseDown, animate, id, path, error } = this.props;
    this.mouseMove();
    return (
      <div
        ref={(elem) => (this.elem = elem)}
        onMouseOver={onMouseOver}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        className={`${animate === id ? 'pop' : ''}${error && path.indexOf(id) > -1 ? ' error' : ''}`}
      >
        <div />
      </div>
    );
  }
}

class Pattern extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: 0,
      path: [],
      width: 0,
      mouseX: 0,
      mouseY: 0,
      timeout: 0,
      timeout2: 0,
      error: false,
      errorText: false,
      errorMessage: 'Wrong pattern',
    };
    this.mouseDown = false;
    this.elem = null;
    this.mouseMove = this.mouseMove.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.unbindEvents = this.unbindEvents.bind(this);
    this.jumpingCombinations = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];
  }

  mouseMove({ clientX, clientY, touches }) {
    this.setState({
      mouseX: touches ? touches[0].pageX : clientX,
      mouseY: touches ? touches[0].pageY : clientY,
    });
  }

  compare() {
    if (!this.props.correctPattern) return false;
    let path = this.state.path;
    let l =
      path.length > this.props.correctPattern.length
        ? path.length
        : this.props.correctPattern.length;
    for (let i = 0; i < l; i++) {
      if (path[i] !== this.props.correctPattern[i]) return false;
    }
    return true;
  }

  bindEvents(e) {
    this.mouseMove(e);
    this.mouseDown = true;

    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('touchmove', this.mouseMove);

    clearTimeout(this.state.timeout);
    clearTimeout(this.state.timeout2);

    if (this.state.errorText) {
      this.setState({
        error: false,
        errorText: false,
        path: [],
      });
    }
  }

  unbindEvents(e) {
    this.mouseDown = false;
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('touchmove', this.mouseMove);
    let withoutCompare = !Array.isArray(this.props.correctPattern);
    let isLengthCorrect = withoutCompare ? this.state.path.length > 3 : true;

    if (this.state.path.length > 0) {
      if (isLengthCorrect && (withoutCompare || this.compare())) {
        if (withoutCompare) return this.props.done(this.state.path);
        this.setState({
          done: true,
          path: [],
        });
        if (this.props.done) {
          this.props.done(this.state.path);
        }
      } else {
        this.setState({
          error: true,
          errorText: true,
          errorMessage: isLengthCorrect
            ? 'Wrong pattern'
            : 'You must connect 4 points at least',
          timeout: setTimeout(
            this.setState.bind(this, {
              path: [],
              error: false,
            }),
            3000,
          ),
          timeout2: setTimeout(
            this.setState.bind(this, {
              errorText: false,
            }),
            6000,
          ),
        });
      }
    }
  }

  componentDidMount() {
    this.setState({
      width: this.elem.offsetWidth,
    });

    window.addEventListener('resize', () => {
      let width = this.elem.offsetWidth;
      this.elem.style.height = `${width}px`;
      this.setState({ width });
    });

    this.elem.style.height = `${this.elem.offsetWidth}px`;

    this.elem.addEventListener('mousedown', this.bindEvents);
    this.elem.addEventListener('touchstart', this.bindEvents);

    document.addEventListener('mouseup', this.unbindEvents);
    document.addEventListener('touchend', this.unbindEvents);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.unbindEvents);
    document.removeEventListener('touchend', this.unbindEvents);
    this.elem.removeEventListener('mousedown', this.bindEvents);
    this.elem.removeEventListener('touchstart', this.bindEvents);
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('touchmove', this.mouseMove);
  }

  pathStart(i) {
    this.setState({
      path: [i],
    });
  }

  //checks for jumping lines for example if the user connects from the point on the top left to the point on the bottom right the middle point should be automatically selected aswell
  checkJumping(nextPoint) {
    let lastPoint = this.state.path[this.state.path.length - 1];
    for (let l = this.jumpingCombinations.length - 1; l >= 0; l--) {
      let [x, jumpy, y] = this.jumpingCombinations[l];
      if (
        (x === nextPoint && y === lastPoint) ||
        (x === lastPoint && y === nextPoint)
      )
        return jumpy;
    }
    return false;
  }

  mouseOver(i) {
    if (this.state.path.indexOf(i) > -1 || !this.mouseDown) return;

    let newPath = [...this.state.path];
    let isJumping = this.checkJumping(i);
    if (isJumping) newPath.push(isJumping);

    newPath.push(i);
    this.setState({
      animate: i,
      path: newPath,
    });
  }

  render() {
    let pos = this.elem ? this.elem.getBoundingClientRect() : {};
    let points = [];
    for (let i = 1; i < 10; i++) {
      points.push(
        <div>
          <PatternPoint
            onMouseOver={this.mouseOver.bind(this, i)}
            onMouseDown={this.pathStart.bind(this, i)}
            animate={this.state.animate}
            error={this.state.error}
            path={this.state.path}
            id={i}
            pageX={this.state.mouseX}
            pageY={this.state.mouseY}
            animated={this.props.animated}
          />
        </div>,
      );
    }
    return (
      <div ref={(elem) => (this.elem = elem)} className="pattern-outer">
        {points}
        <PatternPath
          path={this.state.path}
          width={this.state.width}
          mouseX={this.state.mouseX}
          mouseY={this.state.mouseY}
          error={this.state.error}
          elemPos={{
            x: pos.left,
            y: pos.top,
          }}
        />
        {this.state.errorText ? (
          <div className="error-text">{this.state.errorMessage}</div>
        ) : null}
        {this.props.label ? (
          <div className="label">{this.props.label}</div>
        ) : null}
      </div>
    );
  }
}

const percentage = Math.floor(Math.random() * 80) + 10;
const inversePercentage = (x) => Math.abs(x - 100);

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slided: false,
      initial: 0,
      distance: 0,
      animated: false,
      isPatternSet: false,
      correctPattern: [],
      unlocked: false,
      showCredits: false,
    };
    this.slide = this.slide.bind(this);
    this.bindEvents = this.bindEvents.bind(this);
    this.unbindEvents = this.unbindEvents.bind(this);
  }

  slide(e) {
    this.setState({
      distance:
        this.state.initial - (e.touches ? e.touches[0].pageY : e.clientY),
    });
  }

  bindEvents(e) {
    this.setState({
      initial: e.touches ? e.touches[0].pageY : e.clientY,
    });
    document.addEventListener('mousemove', this.slide);
    document.addEventListener('touchmove', this.slide);
  }

  unbindEvents() {
    if (this.state.distance > 300) {
      document.removeEventListener('mousedown', this.bindEvents);
      document.removeEventListener('mouseup', this.unbindEvents);
      document.removeEventListener('touchstart', this.bindEvents);
      document.removeEventListener('touchend', this.unbindEvents);
      this.setState({
        distance: 300,
        initial: 0,
        animated: true,
      });
    } else {
      this.setState({
        distance: 0,
        initial: 0,
      });
    }
    document.removeEventListener('mousemove', this.slide);
    document.removeEventListener('touchmove', this.slide);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.bindEvents);
    document.addEventListener('touchstart', this.bindEvents);
    document.addEventListener('mouseup', this.unbindEvents);
    document.addEventListener('touchend', this.unbindEvents);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.bindEvents);
    document.removeEventListener('touchstart', this.bindEvents);
    document.removeEventListener('mouseup', this.unbindEvents);
    document.removeEventListener('touchend', this.unbindEvents);
    document.removeEventListener('touchmove', this.slide);
  }

  unlock() {
    this.setState({
      unlocked: true,
      distance: 0,
    });
    setTimeout(this.setState.bind(this, { showCredits: true }), 1000);
  }

  done(path) {
    if (this.state.correctPattern.length) {
      return this.setState({
        isPatternSet: true,
      });
    }
    this.setState({
      correctPattern: path,
    });
  }

  render() {
    if (this.state.showCredits) {
      return (
        <div className="phone">
          <Credits />
        </div>
      );
    }
    return this.state.isPatternSet ? (
      <Motion
        style={{
          percentage: spring(
            this.state.distance > 300
              ? 0
              : inversePercentage((this.state.distance * 100) / 300),
            { stiffness: 300, damping: 20 },
          ),
        }}
      >
        <div
          className={`pattern${this.state.animated ? ' animate' : ''}${this.state.unlocked ? ' done' : ''}`}
        >
          <Pattern
            correctPattern={this.state.correctPattern}
            animated={this.state.animated}
            done={this.unlock.bind(this)}
          />
        </div>
      </Motion>
    ) : (
      <div className="phone">
        <div className="pattern set animate">
          {this.state.correctPattern.length ? (
            <Pattern
              key={12345} // a random number to make the component reset when this.state.correctPattern changes
              done={this.done.bind(this)}
              animated={true}
              label="Draw pattern again to confirm"
              correctPattern={this.state.correctPattern}
            />
          ) : (
            <Pattern
              key={54321}
              done={this.done.bind(this)}
              animated={true}
              label="Choose your pattern"
            />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Layout />, document.getElementById('root'));
