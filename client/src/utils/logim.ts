class Logim {
  log(level: string, message: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
  }

  info(message: string) {
    this.log("info", message);
  }

  error(message: string | Error) {
    const msg = message instanceof Error ? message.message : message;
    this.log("error", msg);
  }

  warn(message: string) {
    this.log("warn", message);
  }

  debug(message: string) {
    this.log("debug", message);
  }
}

const logim = new Logim();
export default logim;
