import { GCalEvent } from "@/shared/gcalevent.interface";
import { Shift } from "./Shift";
import { format as dateFormat } from "date-fns";

export type MatchMap = {
  filled: RegExpMatchArray[];
  open: RegExpMatchArray[];
  extra: string[];
};

export class CmoEvent {
  title: string;
  location: string;
  notes: string;
  id: string;
  creator: string;
  updated: Date;
  created: Date;
  openShifts: Shift[];
  filledShifts: Shift[];
  start: Date;
  end: Date;

  private fullShiftPattern =
    /^([A-Z][a-z]+ [A-Z]\.)\s\(([^)]+)\):\s((\d{1,2}:\d{2}[ap]m)-(\d{1,2}:\d{2}[ap]m|[Cc]lose))\s(\([A-Z]+ confirmed \d{1,2}\/\d{1,2}\/\d{2,4}[^)]*\))$/;
  private openShiftPattern =
    /^open\s\(([^)]+)\):\s((\d{1,2}:\d{2}[ap]m)-(\d{1,2}:\d{2}[ap]m|[Cc]lose))$/;

  constructor(event: GCalEvent) {
    this.title = event.summary;
    this.location = event.location;
    this.id = event.id;
    this.creator = event.creator.email;
    this.updated = new Date(event.updated);
    this.created = new Date(event.created);
    this.start = new Date(event.start.dateTime);
    this.end = new Date(event.end.dateTime);

    const matchMap: MatchMap = { filled: [], open: [], extra: [] };
    const descLines = event.description.split("\n");

    for (const line of descLines) {
      const full = line.match(this.fullShiftPattern);
      const open = line.match(this.openShiftPattern);
      if (full) {
        matchMap.filled.push(full);
      } else if (open) {
        matchMap.open.push(open);
      } else {
        matchMap.extra.push(line);
      }
    }
    this.notes = matchMap.extra.join("/n").trim();
    this.openShifts = matchMap.open.map((shift) => {
      return new Shift({
        filledBy: null,
        confirmationNote: "",
        role: shift[1],
        start: shift[3],
        end: shift[4],
      });
    });
    this.filledShifts = matchMap.filled.map((shift) => {
      return new Shift({
        filledBy: shift[1],
        role: shift[2],
        start: shift[4],
        end: shift[5],
        confirmationNote: shift[5],
      });
    });
  }

  inEvent(employeeName: string) {
    for (const shift of this.filledShifts) {
      if (shift.filledBy == employeeName) return true;
    }
    return false;
  }

  roleInEvent(employeeName: string) {
    for (const shift of this.filledShifts) {
      if (shift.filledBy == employeeName) return shift.role;
    }
    return false;
  }

  get hasOpenShifts() {
    return this.openShifts.length > 0 && !this.title.startsWith("[Canceled]");
  }

  get longDateString() {
    return dateFormat(this.start, "PPPP");
  }
  get startTimeString() {
    return dateFormat(this.start, "p");
  }
  get endTimeString() {
    return dateFormat(this.end, "p");
  }
  get timeRangeString() {
    return `${this.startTimeString} - ${this.endTimeString}`;
  }
  get longTimeRangeString() {
    return `${dateFormat(this.start, "EEEE MMMM dd, h:mm a")} - ${
      this.endTimeString
    }`;
  }
}
