import { useEffect } from "react";
import {
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
} from "@supabase/realtime-js";

import supabase from "~/supabase/server";

export const usePGSubscription = <T extends { [key: string]: any }>(
  {
    event = "*",
    schema = "public",
    table = "*",
  }: Partial<RealtimePostgresChangesFilter<"*">>,
  callback: (payload: RealtimePostgresChangesPayload<T>) => void,
) => {
  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on("postgres_changes", { event, schema, table }, callback)
      .subscribe();

    return () => {
      supabase.removeChannel(channel).catch(console.error);
    };
  }, [callback, event, schema, table]);
};
