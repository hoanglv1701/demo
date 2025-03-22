export const validateCoordinates = (value: string, name: string) => {
  try {
    const coordinates = JSON.parse(value);
    // Kiểm tra xem mảng có đúng định dạng tọa độ (mảng chứa các mảng 2 giá trị)
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      return Promise.reject(new Error(`${name} không hợp lệ`));
    }
    // Kiểm tra từng cặp tọa độ
    for (let i = 0; i < coordinates.length; i++) {
      const coord = coordinates[i];
      // Kiểm tra xem mỗi phần tử có phải là mảng 2 phần tử và mỗi phần tử là số không
      if (!Array.isArray(coord) || coord.length !== 2 ||
        typeof coord[0] !== 'number' || typeof coord[1] !== 'number') {
        return Promise.reject(new Error(`${name} không hợp lệ`));
      }
      // Làm tròn vĩ độ và kinh độ đến 5 chữ số sau dấu chấm
      coord[0] = parseFloat(coord[0].toFixed(5));
      coord[1] = parseFloat(coord[1].toFixed(5));
    }
    // Kiểm tra lại giá trị sau khi làm tròn
    const formattedValue = JSON.stringify(coordinates);
    return Promise.resolve(formattedValue);
  } catch (error) {
    return Promise.reject(new Error(`${name} không hợp lệ`));
  }
};

// Validator tùy chỉnh để kiểm tra số thập phân và chiều rộng > 0
export const validateDecimal = (value: number, name: string, min: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return Promise.reject(new Error(`${name} phải là số`));
  }
  if (value <= min) {
    return Promise.reject(new Error(`${name} phải lớn hơn ${min}`));
  }
  const regex = /^\d+(\.\d{1,2})?$/; // Số nguyên hoặc số thập phân với tối đa 2 chữ số sau dấu chấm
  if (!regex.test(value.toString())) {
    return Promise.reject(new Error(`${name} phải là số thập phân hợp lệ`));
  }
  return Promise.resolve();
};
