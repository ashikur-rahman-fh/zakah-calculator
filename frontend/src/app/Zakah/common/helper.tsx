type FormatMap = Record<string, unknown>;

function isPlainObject(value: unknown): value is FormatMap {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function format(template: string, ...args: unknown[]): string {
  if (typeof template !== "string") {
    throw new TypeError("template must be a string");
  }

  if (args.length === 1 && isPlainObject(args[0])) {
    const map = args[0] as FormatMap;
    return template.replace(
      /\{([a-zA-Z_$][\w$]*)\}/g,
      (_match, key: string) => {
        if (key in map) {
          return String(map[key]);
        }
        throw new Error(`Key '${key}' not provided to format()`);
      },
    );
  }

  let autoIndex = 0;
  return template.replace(/\{(\d*)\}/g, (_match, explicit: string) => {
    const index: number = explicit === "" ? autoIndex++ : Number(explicit);
    if (index >= args.length) {
      throw new Error(`Index ${index} is out of range for format()`);
    }
    return String(args[index]);
  });
}

export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

export const getCurrentMonth = (): string => {
  return new Date().toLocaleString("default", { month: "long" });
};
