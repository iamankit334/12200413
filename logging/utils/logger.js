// src/utils/logger.js

export const logger = (message, level = "info", data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...(data ? { data } : {}),
  };

  // Display in dev tools (but NOT using console.log)
  const logText = `[${logEntry.timestamp}] ${logEntry.level}: ${logEntry.message}`;
  if (data) {
    console.info(logText, data);
  } else {
    console.info(logText);
  }

  // Future extension: Save logs to localStorage, API, or file
  // Example: sendLogsToServer(logEntry);
};
