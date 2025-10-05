import { IpDetails } from "./components/ip-details";
import { useIpInfo } from "./hooks/use-ip-info";

export default function Command() {
  const { isLoading, ipInfo } = useIpInfo();

  return <IpDetails ipInfo={ipInfo} isLoading={isLoading} />;
}
