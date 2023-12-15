import { DEBUG_LEVEL } from "../config";

const levels: LogLevel[] = ['everything', 'info', 'debug']

const checkLogLevel = (level: LogLevel): boolean => DEBUG_LEVEL !== 'off' && levels.indexOf(DEBUG_LEVEL) >= levels.indexOf(level)


function log(...args: any[]) {
    checkLogLevel('everything') && console.log(...args)
}

function debug(...args: any[]) {
    checkLogLevel('debug') && console.log(...args)
}


function info(...args: any[]) {
    checkLogLevel('info') && console.log(...args)
}

const logger = {
    log, debug, info
}

export default logger