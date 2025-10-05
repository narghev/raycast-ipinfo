import { Action, ActionPanel, Detail } from "@raycast/api";
import { IPBogon, IPinfo, IPinfoLite } from "node-ipinfo/dist/src/common";
import { BogonIP } from "./bogon-ip";
import { getFlagEmoji } from "../utils/country-emoji";

interface IpDetailsProps {
  ipInfo: IPinfoLite | IPinfo | IPBogon | null;
  isLoading: boolean;
}

const constructMarkdown = (ipInfo: IPinfoLite | IPinfo) => `
## Your IP Information
---
# **${ipInfo?.ip}**
## ${ipInfo.country} ${getFlagEmoji(ipInfo.countryCode)}
\`\`\`json
${JSON.stringify(ipInfo, null, 2)}
\`\`\`
`;

export const IpDetails = ({ ipInfo, isLoading }: IpDetailsProps) => {
  if (ipInfo && "bogon" in ipInfo && ipInfo.bogon) {
    return <BogonIP ipInfo={ipInfo as IPBogon} />;
  }

  const notBogonIp = ipInfo as IPinfoLite | IPinfo;

  return (
    <Detail
      markdown={!isLoading && notBogonIp ? constructMarkdown(notBogonIp) : ""}
      isLoading={isLoading}
      actions={
        <ActionPanel title="IP Details">
          <Action.CopyToClipboard title="Copy IP" content={ipInfo?.ip || ""} />
          <Action.CopyToClipboard title="Copy JSON" content={JSON.stringify(ipInfo, null, 2)} />
        </ActionPanel>
      }
    />
  );
};
