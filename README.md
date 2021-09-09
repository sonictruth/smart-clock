# Smart Clock - _digital signage_

Smart Clock is a light web application written in React that displays time, weather, videos (maybe other things in the future) on a tablet-like device or anything with a browser. 

Kindle 1 2011 (Upgraded to slimp ROM) running Smart Clock using Fully.
<img src="screen.png">

- [Demo](https://sonictruth.github.io/smart-clock/). 

**⚠️ Swipe left or right (using mouse or touch) to changee screen.**

ℹ️ Optionaly you can load external playlist by using the playlist parameter:

https://sonictruth.github.io/smart-clock/?playlist=https://raw.githubusercontent.com/iptv-org/iptv/master/channels/pl.m3u

Use [Fully Kiosk Browser](https://www.fully-kiosk.com/#get-kiosk-apps) or 
[Add to Home screen](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen) for a full screen experience.

### Start
```REACT_APP_OPEN_WEATHER_URL=https://api.openweathermap.org/data/2.5/onecall REACT_APP_OPEN_WEATHER_KEY=xxxxxxxx npm run start```

### Deploy
```REACT_APP_OPEN_WEATHER_URL=https://api.openweathermap.org/data/2.5/onecall REACT_APP_OPEN_WEATHER_KEY=xxxxxxxx npm run deploy```
