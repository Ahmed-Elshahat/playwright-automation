// utils/logger.ts
import * as fs from "fs";
import * as path from "path";

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LoggerConfig {
  logLevel?: LogLevel;
  logToFile?: boolean;
  logToConsole?: boolean;
  logDir?: string;
  logFileName?: string;
  includeTimestamp?: boolean;
  colorize?: boolean;
}

export class Logger {
  private static instances: Map<string, Logger> = new Map();
  private logLevel: LogLevel;
  private logToFile: boolean;
  private logToConsole: boolean;
  private logFilePath: string;
  private includeTimestamp: boolean;
  private colorize: boolean;
  private name: string;

  // ANSI color codes
  private readonly colors = {
    reset: "\x1b[0m",
    debug: "\x1b[36m", // Cyan
    info: "\x1b[32m", // Green
    warn: "\x1b[33m", // Yellow
    error: "\x1b[31m", // Red
    step: "\x1b[35m", // Magenta
    test: "\x1b[34m", // Blue
  };

  private constructor(name: string = "default", config: LoggerConfig = {}) {
    this.name = name;
    this.logLevel = config.logLevel ?? LogLevel.INFO;
    this.logToFile = config.logToFile ?? true;
    this.logToConsole = config.logToConsole ?? true;
    this.includeTimestamp = config.includeTimestamp ?? true;
    this.colorize = config.colorize ?? true;

    // Setup log directory and file
    const logsDir = config.logDir ?? path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().split("T")[0];
    const fileName = config.logFileName ?? `${name}-${timestamp}.log`;
    this.logFilePath = path.join(logsDir, fileName);
  }

  /**
   * Get or create a logger instance
   */
  static getInstance(name: string = "default", config?: LoggerConfig): Logger {
    if (!Logger.instances.has(name)) {
      Logger.instances.set(name, new Logger(name, config));
    }
    return Logger.instances.get(name)!;
  }

  /**
   * Create a new logger instance
   */
  static create(name: string, config?: LoggerConfig): Logger {
    const logger = new Logger(name, config);
    Logger.instances.set(name, logger);
    return logger;
  }

  /**
   * Get all logger instances
   */
  static getAllInstances(): Map<string, Logger> {
    return Logger.instances;
  }

  /**
   * Clear all logger instances
   */
  static clearInstances(): void {
    Logger.instances.clear();
  }

  // Configuration methods
  setLogLevel(level: LogLevel): Logger {
    this.logLevel = level;
    return this;
  }

  setLogToFile(enabled: boolean): Logger {
    this.logToFile = enabled;
    return this;
  }

  setLogToConsole(enabled: boolean): Logger {
    this.logToConsole = enabled;
    return this;
  }

  setColorize(enabled: boolean): Logger {
    this.colorize = enabled;
    return this;
  }

  getLogFilePath(): string {
    return this.logFilePath;
  }

  getName(): string {
    return this.name;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(
    level: string,
    message: string,
    data?: any,
    color?: string
  ): { console: string; file: string } {
    const timestamp = this.includeTimestamp ? `[${this.getTimestamp()}]` : "";
    const loggerName = `[${this.name}]`;
    const levelTag = `[${level}]`;

    let baseMsg = `${timestamp} ${loggerName} ${levelTag} ${message}`;

    if (data !== undefined) {
      const dataStr =
        typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
      baseMsg += `\n${dataStr}`;
    }

    // Console version with color
    const consoleMsg =
      this.colorize && color
        ? `${color}${baseMsg}${this.colors.reset}`
        : baseMsg;

    return {
      console: consoleMsg,
      file: baseMsg,
    };
  }

  private log(
    level: LogLevel,
    levelName: string,
    message: string,
    data?: any,
    color?: string
  ): void {
    if (this.logLevel > level) return;

    const formatted = this.formatMessage(levelName, message, data, color);

    if (this.logToConsole) {
      const logFn = level === LogLevel.ERROR ? console.error : console.log;
      logFn(formatted.console);
    }

    if (this.logToFile) {
      this.writeToFile(formatted.file);
    }
  }

  private writeToFile(message: string): void {
    try {
      fs.appendFileSync(this.logFilePath, message + "\n", "utf-8");
    } catch (error) {
      console.error("Failed to write to log file:", error);
    }
  }

  // Main logging methods
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, "DEBUG", message, data, this.colors.debug);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, "INFO", message, data, this.colors.info);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, "WARN", message, data, this.colors.warn);
  }

  error(message: string, error?: Error | any): void {
    const errorData =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;

    this.log(LogLevel.ERROR, "ERROR", message, errorData, this.colors.error);
  }

  // Test-specific logging methods
  step(stepName: string, data?: any): void {
    const formatted = this.formatMessage(
      "STEP",
      `>>> ${stepName}`,
      data,
      this.colors.step
    );

    if (this.logToConsole) {
      console.log(`\n${formatted.console}\n`);
    }

    if (this.logToFile) {
      this.writeToFile(`\n${formatted.file}\n`);
    }
  }

  testStart(testName: string, metadata?: any): void {
    const separator = "=".repeat(80);
    const message = `\n${separator}\nTEST STARTED: ${testName}\n${separator}`;

    const formatted = this.formatMessage(
      "TEST",
      message,
      metadata,
      this.colors.test
    );

    if (this.logToConsole) {
      console.log(formatted.console);
    }

    if (this.logToFile) {
      this.writeToFile(formatted.file);
    }
  }

  testEnd(
    testName: string,
    status: "PASSED" | "FAILED",
    duration?: number
  ): void {
    const separator = "=".repeat(80);
    const durationStr = duration ? ` (${duration}ms)` : "";
    const message = `\n${separator}\nTEST ${status}: ${testName}${durationStr}\n${separator}\n`;

    const color = status === "PASSED" ? this.colors.info : this.colors.error;
    const formatted = this.formatMessage("TEST", message, undefined, color);

    if (this.logToConsole) {
      console.log(formatted.console);
    }

    if (this.logToFile) {
      this.writeToFile(formatted.file);
    }
  }

  suiteStart(suiteName: string): void {
    const separator = "#".repeat(80);
    const message = `\n${separator}\nSUITE STARTED: ${suiteName}\n${separator}\n`;

    if (this.logToConsole) {
      console.log(
        this.colorize
          ? `${this.colors.test}${message}${this.colors.reset}`
          : message
      );
    }

    if (this.logToFile) {
      this.writeToFile(message);
    }
  }

  suiteEnd(suiteName: string): void {
    const separator = "#".repeat(80);
    const message = `\n${separator}\nSUITE ENDED: ${suiteName}\n${separator}\n`;

    if (this.logToConsole) {
      console.log(
        this.colorize
          ? `${this.colors.test}${message}${this.colors.reset}`
          : message
      );
    }

    if (this.logToFile) {
      this.writeToFile(message);
    }
  }

  // API/Network logging
  apiRequest(method: string, url: string, data?: any): void {
    this.info(`API Request: ${method} ${url}`, data);
  }

  apiResponse(method: string, url: string, status: number, data?: any): void {
    const level = status >= 400 ? "error" : "info";
    this[level](`API Response: ${method} ${url} - Status: ${status}`, data);
  }

  // Performance logging
  performance(label: string, duration: number): void {
    this.info(`Performance: ${label}`, { duration: `${duration}ms` });
  }

  // Screenshot logging
  screenshot(message: string, screenshotPath?: string): void {
    this.info(message, screenshotPath ? { path: screenshotPath } : undefined);
  }

  // Custom separator
  separator(char: string = "-", length: number = 80): void {
    const sep = char.repeat(length);
    if (this.logToConsole) {
      console.log(sep);
    }
    if (this.logToFile) {
      this.writeToFile(sep);
    }
  }

  // Group logging
  group(label: string): void {
    this.info(`┌─ ${label}`);
  }

  groupEnd(): void {
    this.info("└─");
  }

  // Table logging (for arrays of objects)
  table(data: any[], title?: string): void {
    if (title) {
      this.info(title);
    }
    if (this.logToConsole) {
      console.table(data);
    }
    if (this.logToFile) {
      this.writeToFile(JSON.stringify(data, null, 2));
    }
  }

  // Clear log file
  clearLogFile(): void {
    if (fs.existsSync(this.logFilePath)) {
      fs.writeFileSync(this.logFilePath, "", "utf-8");
      this.info("Log file cleared");
    }
  }

  // Get log file content
  getLogFileContent(): string {
    if (fs.existsSync(this.logFilePath)) {
      return fs.readFileSync(this.logFilePath, "utf-8");
    }
    return "";
  }
}

// Export default instance for convenience
export const logger = Logger.getInstance("default");

// Export specialized loggers
export const testLogger = Logger.getInstance("test");
export const apiLogger = Logger.getInstance("api");
export const perfLogger = Logger.getInstance("performance");
