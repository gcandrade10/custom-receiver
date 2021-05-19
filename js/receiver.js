const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// Debug Logger
// const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
const LOG_TAG = 'MyAPP.LOG';

// Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
castDebugLogger.setEnabled(true);

// Show debug overlay
castDebugLogger.showDebugLogs(true);

// Set verbosity level for Core events.
castDebugLogger.loggerLevelByEvents = {'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG}

// Set verbosity level for custom tags.
castDebugLogger.loggerLevelByTags = {LOG_TAG: cast.framework.LoggerLevel.DEBUG};

function makeRequest (url,payload) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.send(payload);
}

const playerData = new cast.framework.ui.PlayerData();
const playerDataBinder = new cast.framework.ui.PlayerDataBinder(playerData);
  
  playerDataBinder.addEventListener(
  cast.framework.ui.PlayerDataEventType.CURRENT_TIME_CHANGED,
  (e) => {
    if (!e.value) return;
	const data = JSON.stringify({"chapterId":playerData.media.customData.chapterId,
    "position":Math.trunc(e.value*1000),
    "duration":Math.trunc(playerData.duration*1000)})
	makeRequest("http://192.168.1.100:8383/watching/set",data)
  });

context.start();
