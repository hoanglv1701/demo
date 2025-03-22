export const GET_BLOCK = 'GET_BLOCK';

export const actionCode: { [key: string]: string } = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

export const isSave = (a: string) => {
  return a === actionCode.CREATE || a === actionCode.UPDATE;
};

export const isUpdate = (a: string) => {
  return a === actionCode.UPDATE;
};
