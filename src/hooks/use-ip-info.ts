import { useEffect, useState } from "react";
import { getIpInfo, getMyIPInfo } from "../utils/ip-info";
import { IPBogon, IPinfo, IPinfoLite } from "node-ipinfo/dist/src/common";
import { isValidIpV4 } from "../utils/ip-validator";

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
      } else {
        if (!isValidIpV4(ip)) {
          setErrorText("Invalid IPv4 address.");
          setIsLoading(false);
          return;
        }
        try {
          setIpInfo(await getIpInfo(ip));
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
