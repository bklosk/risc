import { NextResponse } from "next/server";
import os from "os";

/**
 * Health check API endpoint for monitoring application status
 * Used by deployment scripts and external monitoring tools
 */
export async function GET() {
  // Basic health information
  const healthData = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: os.cpus()[0]?.model,
    hostname: os.hostname(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV,
  };

  // Return 200 OK with health data
  return NextResponse.json(healthData, { status: 200 });
}
