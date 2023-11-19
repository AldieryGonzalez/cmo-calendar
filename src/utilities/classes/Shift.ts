interface ShiftParams {
  filledBy: string | null;
  role: string;
  start: string;
  end: string;
  confirmationNote: string;
}
export class Shift {
  filledBy: string | null;
  role: string;
  start: string;
  end: string;
  confirmationNote: string;

  constructor(obj: ShiftParams) {
    this.filledBy = obj.filledBy;
    this.role = obj.role;
    this.start = obj.start;
    this.end = obj.end;
    this.confirmationNote = obj.confirmationNote;
  }
  get isFilled() {
    return this.filledBy !== null;
  }
  get isConfirmed() {
    return this.confirmationNote !== "";
  }
  get isUnconfirmed() {
    return this.confirmationNote === "";
  }
  get isUnfilled() {
    return this.filledBy === null;
  }
  get stringify() {
    return `${this.isFilled ? this.filledBy : "open"} (${this.role}): ${
      this.start
    }-${this.end}`;
  }
}
