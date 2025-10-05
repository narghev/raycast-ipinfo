import { useEffect, useState } from "react";
import { AllIpInfo, getMyIPInfo } from "../utils/ip-info";

export const useIpInfo = (ip?: string) => {
  const [ipInfo, setIpInfo] = useState<AllIpInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIpInfo = async () => {
      setIsLoading(true);
      if (!ip) {
        setIpInfo(await getMyIPInfo());
      }
      setIsLoading(false);
    };

    fetchIpInfo();
  }, [ip]);

  return { ipInfo, isLoading };
};
