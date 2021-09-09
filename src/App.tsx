import './App.scss';
import {
  useRef,
  useState,
} from 'react';
import {
  Route,
  useHistory,
  useLocation,
  Switch,
} from 'react-router-dom';

import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import MediaPlayer from './screens/MediaPlayer';
import MainScreen from './screens/MainScreen';

const config = {
  routes: [
    {
      path: "/MediaPlayer",
      Component: MediaPlayer,
    },
    {
      path: "/",
      Component: MainScreen,
    },
  ],
}

function App() {

  // const screenNodeRef = useRef(null);

  const [swipeDirection, setSwipeDirection]
    = useState<'left' | 'right'>('left');

  const touchPositionsRef = useRef<TouchPosition>({
    start: 0,
    end: 0
  });

  const history = useHistory();
  const location = useLocation();

  const getPosition = (event: any): number =>
    event.clientX || (
      (event.targetTouches && event.targetTouches.length > 0) ?
        event.targetTouches[0].clientX : 0
    );

  const handleTouchStart = (event: any) => {
    touchPositionsRef.current.start = getPosition(event);
    touchPositionsRef.current.end = getPosition(event);
  }

  const handleTouchMove = (event: any) => {
    touchPositionsRef.current.end = getPosition(event);
  }

  const handleTouchEnd = (event: any) => {
    const currentLocation = history.location.pathname;
    const touchPositions = touchPositionsRef.current;
    const currentLocationRouteIndex = config.routes.findIndex(
      (route: any) =>
        route.path === currentLocation
    );

    let nextLocationRouteIndex = null;

    if (touchPositions.start - touchPositions.end > 50) {
      nextLocationRouteIndex = currentLocationRouteIndex - 1;
      if (nextLocationRouteIndex < 0) {
        nextLocationRouteIndex = config.routes.length - 1;
      }
      setSwipeDirection('left');
    };

    if (touchPositions.start - touchPositions.end < -50) {
      nextLocationRouteIndex = currentLocationRouteIndex + 1;
      if (nextLocationRouteIndex > config.routes.length - 1) {
        nextLocationRouteIndex = 0;
      }
      setSwipeDirection('right');
    }

    if (nextLocationRouteIndex !== null) {
      history.push(config.routes[nextLocationRouteIndex].path);
    }
    touchPositions.start = 0;

  }
  return (
    <div
      className={`App AppSwipe-${swipeDirection}`}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}

      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <div className="AppPortraitWarning">
        ⚠️ Please rotate your device.
      </div>

      <TransitionGroup
        component={null}
      >
        <CSSTransition
          key={location.pathname}
          classNames="AppScreen"
          timeout={300}
        /* FIXME: findDomNode warning*/
        /* nodeRef={screenNodeRef} */
        >
          <Switch location={location}>
            {config.routes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
              >
                <div
                  /* ref={screenNodeRef} */
                  className="AppScreen"  >
                  <Component />
                </div>
              </Route>
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>

    </div>
  );
}

export default App;
