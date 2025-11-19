import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";

export function getWhereOrOptions<T>(
  different: FindOptionsWhere<T>[],
  common: FindOptionsWhere<T>
): FindOptionsWhere<T>[] {
  return different.map((d) => ({ ...d, ...common }));
}

export function getBooleanFromString(value?: "true" | "false") {
  return value ? (value === "true" ? true : false) : undefined;
}

export function getNumberRangeFindOperator(min?: number, max?: number) {
  return min && max
    ? Between(min, max)
    : min
      ? MoreThanOrEqual(min)
      : max
        ? LessThanOrEqual(max)
        : undefined;
}
