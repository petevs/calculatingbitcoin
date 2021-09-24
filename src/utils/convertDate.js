export const convertDate = (x) => {
    const theDate = new Date(x);
    return theDate.toLocaleDateString();
  };


export const convertDateTwo = (x) => {
  const theDate = new Date(x);
  return theDate.toISOString().split('T')[0];
}