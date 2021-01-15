const keys = {
  text: '',
  date: '',
  time: '',
  type: 'date',
};
const validate = (item: InputItem) => {
  for (const key of Object.keys(keys) as [keyof InputItem]) {
    if (!item[key].trim()) {
      return false;
    }
  }
  return true;
};
export default validate;
