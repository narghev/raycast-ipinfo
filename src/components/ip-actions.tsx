import { Action, ActionPanel } from "@raycast/api";
import { IPinfo, IPinfoLite } from "node-ipinfo/dist/src/common";

interface IPActionsProps {
  ipInfo: IPinfoLite | IPinfo;
  shouldAllowClearHistory?: boolean;
  onClearHistory?: () => void;
}

export const IPActions = ({ ipInfo, shouldAllowClearHistory = false, onClearHistory }: IPActionsProps) => {
  return (
    <ActionPanel title="IP Details">
      <Action.CopyToClipboard title="Copy IP" content={ipInfo?.ip || ""} />
      <Action.CopyToClipboard title="Copy JSON" content={JSON.stringify(ipInfo, null, 2)} />
      {shouldAllowClearHistory && onClearHistory && <Action title="Clear History" onAction={() => onClearHistory()} />}
    </ActionPanel>
  );
};
