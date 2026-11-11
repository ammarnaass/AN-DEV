import React, { useState } from "react";
import { GatewayToolbar } from "./liveGateway/GatewayToolbar";
import { GatewayFrameContainer } from "./liveGateway/GatewayFrameContainer";
import { GatewayNoticeBanners } from "./liveGateway/GatewayNoticeBanners";

export interface ProjectLiveGatewayProps {
  liveUrl: string;
  title: string;
  coverImage?: string;
  className?: string;
}

export const ProjectLiveGateway: React.FC<ProjectLiveGatewayProps> = ({
  liveUrl,
  title,
  coverImage,
  className = "",
}) => {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasFramingNotice, setHasFramingNotice] = useState<boolean>(false);

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey(prev => prev + 1);
  };

  return (
    <section
      className={`w-full space-y-4 text-start transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto"
          : className
      }`}
    >
      <GatewayToolbar
        liveUrl={liveUrl}
        viewport={viewport}
        setViewport={setViewport}
        isLoading={isLoading}
        onReload={handleReload}
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(prev => !prev)}
      />

      <GatewayFrameContainer
        viewport={viewport}
        liveUrl={liveUrl}
        title={title}
        coverImage={coverImage}
        reloadKey={reloadKey}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        hasFramingNotice={hasFramingNotice}
        setHasFramingNotice={setHasFramingNotice}
      />

      <GatewayNoticeBanners
        hasFramingNotice={hasFramingNotice}
        liveUrl={liveUrl}
      />
    </section>
  );
};
