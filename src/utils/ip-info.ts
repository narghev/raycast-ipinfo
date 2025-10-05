import { getPreferenceValues } from "@raycast/api";
import { IPinfoLiteWrapper } from "node-ipinfo";

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

export const getMyIPInfo = () => getClient().lookupIp();
