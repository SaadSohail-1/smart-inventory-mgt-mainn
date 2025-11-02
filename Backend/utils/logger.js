import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "backend", "logs.txt");
export const logAction = (action) => {
  const entry = `[${new Date().toISOString()}] ${action}\n`;
  fs.appendFile(logFile, entry, err => { if (err) console.error("Log error:", err); });
};
