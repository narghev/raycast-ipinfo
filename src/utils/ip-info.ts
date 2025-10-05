import { getPreferenceValues } from "@raycast/api";
import { IPinfoLiteWrapper } from "node-ipinfo";
import { IPBogon, IPinfo, IPinfoLite } from "node-ipinfo/dist/src/common";

interface Preferences {
  apiToken?: string;
}

const getClient = () => {
  const { apiToken } = getPreferenceValues<Preferences>();

  if (!apiToken) {
    throw new Error("API token is required. Please set it in the preferences.");
  }

  return new IPinfoLiteWrapper(apiToken);
};

export type AllIpInfo = IPBogon | IPinfoLite | IPinfo;

export const getMyIPInfo = () => getClient().lookupIp();
