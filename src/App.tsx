import './App.scss';
import React from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';

import MediaPlayer from './screens/MediaPlayer';
import MainScreen from './screens/MainScreen';

const config = {
  routes: [
    /*
    {
        path: "/YouToubePlayer",
        component: YouToubePlayer,
    },
    */
    {
      path: "/MediaPlayer",
      component: MediaPlayer,
    },
    {
      path: "/",
      component: MainScreen
    },
  ],
}

function App() {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const history = useHistory();

  const getPosition = (event: any): number =>
    event.clientX || (
      (event.targetTouches && event.targetTouches.length > 0) ?
      event.targetTouches[0].clientX : 0
    );

  const handleTouchStart = (event: any) => {
    setTouchStart(getPosition(event));
    setTouchEnd(getPosition(event));
  }

  const handleTouchMove = (event: any) => {
    setTouchEnd(getPosition(event));
  }

  const handleTouchEnd = (event: any) => {
    const currentLocation = history.location.pathname;
    const currentLocationRouteIndex = config.routes.findIndex(
      (route: any) =>
        route.path === currentLocation
    );

    let nextLocationRouteIndex = null;

    if (touchStart - touchEnd > 50) {
      nextLocationRouteIndex = currentLocationRouteIndex - 1;
      if (nextLocationRouteIndex < 0) {
        nextLocationRouteIndex = config.routes.length - 1;
      }

    };

    if (touchStart - touchEnd < -50) {
      nextLocationRouteIndex = currentLocationRouteIndex + 1;
      if (nextLocationRouteIndex > config.routes.length - 1) {
        nextLocationRouteIndex = 0;
      }

    }

    if (nextLocationRouteIndex !== null) {
      history.push(config.routes[nextLocationRouteIndex].path);
    }
    setTouchStart(0);

  }
  return (
    <div className="App"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}

      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <Switch>
        {config.routes.map((route: any, i: number) => (
          <Route
            key={i}
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))}
      </Switch>
    </div>
  );
}

export default App;
