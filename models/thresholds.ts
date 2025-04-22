interface ThresholdEntry {
  label: string;
  value: number;
}

export interface Thresholds {
  trivialThreshold: ThresholdEntry;
  lowThreshold: ThresholdEntry;
  moderateThreshold: ThresholdEntry;
  severeThreshold: ThresholdEntry;
  extremeThreshold: ThresholdEntry;
}
