export const MODIFICATIONS_LABELS = {
  NO_1: "Bass booster",
  NO_2: "Pitch shifter",
  NO_3: "Volume changer",
  NO_4: "Speed changer",
  NO_5: "Reverser",
  NO_6: "Trimmer",
  NO_7: "Cutter",
}

const MODIFICATIONS_VALUES = {
  NO_1: "bass-boost",
  NO_2: "pitch-shift",
  NO_3: "volume-change",
  NO_4: "speed-change",
  NO_5: "reverse",
  NO_6: "trim",
  NO_7: "cut",
}

export const getLabelFromValue = value => {
  switch (value) {
    case MODIFICATIONS_VALUES.NO_1: return MODIFICATIONS_LABELS.NO_1;
    case MODIFICATIONS_VALUES.NO_2: return MODIFICATIONS_LABELS.NO_2;
    case MODIFICATIONS_VALUES.NO_3: return MODIFICATIONS_LABELS.NO_3;
    case MODIFICATIONS_VALUES.NO_4: return MODIFICATIONS_LABELS.NO_4;
    case MODIFICATIONS_VALUES.NO_5: return MODIFICATIONS_LABELS.NO_5;
    case MODIFICATIONS_VALUES.NO_6: return MODIFICATIONS_LABELS.NO_6;
    case MODIFICATIONS_VALUES.NO_7: return MODIFICATIONS_LABELS.NO_7;
    default: return "";
  }
}

export const getValueFromLabel = label => {
  switch (label) {
    case MODIFICATIONS_LABELS.NO_1: return MODIFICATIONS_VALUES.NO_1;
    case MODIFICATIONS_LABELS.NO_2: return MODIFICATIONS_VALUES.NO_2;
    case MODIFICATIONS_LABELS.NO_3: return MODIFICATIONS_VALUES.NO_3;
    case MODIFICATIONS_LABELS.NO_4: return MODIFICATIONS_VALUES.NO_4;
    case MODIFICATIONS_LABELS.NO_5: return MODIFICATIONS_VALUES.NO_5;
    case MODIFICATIONS_LABELS.NO_6: return MODIFICATIONS_VALUES.NO_6;
    case MODIFICATIONS_LABELS.NO_7: return MODIFICATIONS_VALUES.NO_7;
    default: return "";
  }
}