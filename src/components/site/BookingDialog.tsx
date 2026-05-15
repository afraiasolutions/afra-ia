import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBooking } from "@/lib/booking-context";
import { BookingFlow } from "./BookingFlow";
import { useI18n } from "@/lib/i18n";

export function BookingDialog() {
  const { open, setOpen } = useBooking();
  const { t } = useI18n();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl bg-background border-gold/30 max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t.booking.title}</DialogTitle>
          <DialogDescription>{t.booking.subtitle}</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <BookingFlow compact onClose={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
