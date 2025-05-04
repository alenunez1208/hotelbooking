export const converSelectFormat = (values: any) => {
  let options: any = [];

  values.map((val: any) => options.push({ value: val.id, label: val.name }));

  return options;
};
