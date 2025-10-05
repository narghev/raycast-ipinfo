import { useEffect, useState } from "react";
import { getMyIPInfo } from "../utils/ip-info";
import { IPBogon, IPinfo, IPinfoLite } from "node-ipinfo/dist/src/common";

export const useIpInfo = (ip?: string) => {
  const [ipInfo, setIpInfo] = useState<IPBogon | IPinfoLite | IPinfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      setIsLoading(true);
      if (!ip) {
        try {
          setIpInfo(await getMyIPInfo());
        } catch (err) {
          setErrorText((err as Error).message);
        }
      }
      setIsLoading(false);
    };

    fetchIpInfo();
  }, [ip]);

  return { ipInfo, isLoading, errorText };
};
