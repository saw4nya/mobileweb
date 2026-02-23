import { Motion } from "@capacitor/motion";
import type { AccelSample } from "./types";

export class MotionService {
  private remove?: () => void;

  async start(cb: (s: AccelSample) => void): Promise<void> {
    const handler = await Motion.addListener("accel", (event) => {
      const a = event.accelerationIncludingGravity;
      if (!a) return;
      cb({
        ax: a.x ?? 0,
        ay: a.y ?? 0,
        az: a.z ?? 0,
        t: Date.now(),
      });
    });

    this.remove = () => handler.remove();
  }

  async stop(): Promise<void> {
    this.remove?.();
  }
}
