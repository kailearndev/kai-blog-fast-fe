import { FireworksBackground } from "@/components/animate-ui/components/backgrounds/fireworks";
import TetCountdown from "./tet-countdown";

export default function Home() {
  return (
    <div className="relative flex justify-center h-[70vh] w-full items-center ">
      <FireworksBackground />
      <div className="absolute">
        <TetCountdown />
      </div>
    </div>
  );
}
