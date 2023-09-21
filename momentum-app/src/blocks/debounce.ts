// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<A extends (...args: any[]) => any>(
  func: A,
  delay = 300
) {
  let timer: number;
  return function (...arg: Parameters<A>) {
    return new Promise<ReturnType<A>>((resolve) => {
      //pending promises are not deleted
      clearTimeout(timer);
      timer = setTimeout(async () => {
        console.log(...arg);
        const data = await func(...arg);
        resolve(data);
      }, delay);
    });
  };
}
/* function log(a: string, b: number) {
  console.log(a, b);
  return [a, b] as const;
}
const debounced123 = debounce(log, 500);
debounced123("1", 5);
debounced123("2", 4);
debounced123("3", 3);
debounced123("4", 2);
debounced123("5", 1);
debounced123("6", 0);
debounced123("7", -1);
debounced123("8", -2); */

/* setTimeout(() => debounced123("3", 6), 600);
setTimeout(() => debounced123("4", 3), 1000);
setTimeout(() => debounced123("5", 123213), 1400); */
