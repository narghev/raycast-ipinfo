import { Detail } from "@raycast/api";
import { IPBogon, IPinfo, IPinfoLite } from "node-ipinfo/dist/src/common";
import { BogonIP } from "./bogon-ip";

interface IpDetailsProps {
  ipInfo: IPinfoLite | IPinfo | IPBogon | null;
  isLoading: boolean;
}

export const IpDetails = ({ ipInfo, isLoading }: IpDetailsProps) => {
  if (ipInfo && "bogon" in ipInfo && ipInfo.bogon) {
    return <BogonIP ipInfo={ipInfo as IPBogon} />;
  }

  console.log(ipInfo, isLoading);

  const markdown = `
# **${ipInfo?.ip}**
\`\`\`json
${JSON.stringify(ipInfo, null, 2)}
\`\`\`
`;

  return <Detail markdown={!isLoading ? markdown : ""} isLoading={isLoading} />;
};
