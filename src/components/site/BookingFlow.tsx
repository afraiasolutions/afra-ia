import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export function BookingFlow({
  compact = false,
  onClose,
}: {
  compact?: boolean;
  onClose?: () => void;
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <div className={`w-full ${compact ? "min-h-[400px]" : "min-h-[600px]"}`}>
      <Cal
        namespace="30min"
        calLink="afra-ia-marketing-wulosp/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
    </div>
  );
}
