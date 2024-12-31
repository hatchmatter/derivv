export const parseCsv = (csv: string) => {
  const rows = csv.split("\n");
  const headers = rows[0].split(",");
  const data = rows.slice(1).map((row) => row.split(","));
  return { headers, data };
};
