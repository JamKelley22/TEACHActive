import { DateTime } from "luxon";
import COLOR from "../../constants/colors";

export class AvgGradeAssignmentResponse {
  name: string;
  due: DateTime;
  averageGrade: number;

  constructor(data: any) {
    this.name = data.name;
    this.due = DateTime.fromISO(data.due);
    this.averageGrade = data.averageGrade;
  }
}

export class Session {
  id: string;
  createdAt?: DateTime;
  metrics?: SessionMetric[];
  className: string;
  name: string;

  constructor(data: any) {
    this.id = data.id;
    if (data.createdAt)
      this.createdAt = DateTime.fromISO(data.createdAt.RFC3339);

    if (data.metrics)
      this.metrics = data.metrics.map(
        (metric: any) => new SessionMetric(metric)
      );
    this.className = data.className;
    this.name = data.name;
  }
}

type ColorKeys = keyof typeof COLOR;
type ColorValues = typeof COLOR[ColorKeys];

export class SessionMetric {
  name: string;
  metricType: SessionMetricType;
  color?: {
    dark: string;
    light: string;
  };
  metric: number;
  hasDenominator: boolean;
  denominator: number;
  unit: string;
  trend: number; //Oneof(0,1)
  trend_metric: number; //oneof
  trend_metric_unit: string;
  help_text: string;
  has_alert: boolean;

  constructor(data: any) {
    this.name = data.name;
    this.metricType =
      SessionMetricType[data.metricType as keyof typeof SessionMetricType];

    if (data.color) {
      this.color = { light: data.color.light, dark: data.color.dark };
    }
    this.metric = data.metric;
    this.denominator = data.denominator;
    this.hasDenominator = data.hasDenominator;
    this.unit = data.unit;
    this.trend = data.trend;
    this.trend_metric = data.trend_metric;
    this.trend_metric_unit = data.trend_metric_unit;
    this.help_text = data.help_text;
    this.has_alert = data.has_alert;
  }
}

export enum SessionMetricType {
  HandRaises,
  StudentSpeech,
  InstructorSpeech,
  ClassPerformance,
}