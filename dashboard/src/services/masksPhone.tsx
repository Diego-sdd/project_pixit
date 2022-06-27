export function phone(e: any) {
  if (e === undefined) {
    return;
  }
  if (!e.nativeEvent.data) {
    return e.target.value;
  }

  try {
    var x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    const result = `(${x[1] && x[1]}) ` + x[2] + "-" + x[3];
    return result;
  } catch (error) {
    console.log(error);
  }
}
