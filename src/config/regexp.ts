/** Mobile phone number regularization */
export const REGEXP_PHONE =
  /(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|088|091|094|070|079|076|078|090|093|089|056|058|092|059|099])+([0-9]{7})/;

/** Email regex */
export const REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

/** Password regularity (the password is at least 8 to 20 digits/characters/symbols and must have a uppercase, one number, and symbols  ) */
export const REGEXP_PWD = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

/** 6-digit verification code is regular */
export const REGEXP_CODE_SIX = /^\d{6}$/;

/** 4-digit verification code is regular */
export const REGEXP_CODE_FOUR = /^\d{4}$/;

/** url link regular */
export const REGEXP_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+( ?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+ ~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const REGEXP_VIETNAMESE =
  /^[A-Za-z0-9 _aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$/;

export const REGEXP_CURRENCY = /^\d+(\.(\d+)?)?$/;

export const REGEXP_LINE_BREAK = /\n/g;

export const REGEXP_LOCATION = /^\d{1,3}(?:\.\d{1,8})?$/;

export const REGEX_POSITIVE_INTEGER = /^[1-9]\d*$/;

export const REGEX_NUMBER = /^\d+(\.\d+)?$/;

// export const REGEX_NO_SPECIAL_CHARACTER = /^[^!@#$%^&*()_+\-=[\]{};':"|,.<>/?]+$/;
export const REGEX_NO_SPECIAL_CHARACTER = /^[^`~!@#$%^*]+$/;

// Date format DD/MM/YYYY or MM/YYYY or YYYY
export const REGEX_DATE = /^(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}$|^(\d{2}-){0,1}(\d{2}-){0,1}\d{4}$/;

export const REGEX_DATE_RANGE =
  /^(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}$|^Từ\s(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}\sđến\s(\d{2}\/){0,1}(\d{2}\/){0,1}\d{4}$/i;

export const REGEX_CMND_CCCD = /^\d{9}(\d{3})?$/;

export const REGEX_NUMBER_OR_CHAR = /[A-Za-z0-9]+$/;

export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

export const REGEX_UPPER_LOWER_CASE = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

export const REGEX_NUMBER_SPECIAL_CHAR = /^(?=.*\d)(?=.*[\W_]).+$/;

export const REGEX_QUAN_LY_PATHNAME = /quan-ly(?!.*quan-ly)/;

export const REGEX_NUMBER_FORMAT = /\B(?=(\d{3})+(?!\d))/g;

export const REGEX_NUMBER_PARSER = /\$\s?|(,*)/g;

export const REGEX_DECIMAL_NUMBER_PARSER = /\./g;

export const REGEX_ALPHABET_CHARACTER_AND_SPECIAL_CHARACTER = /^[A-Za-z^!@#$%^&*()_+=[\]{};':",.|`~<>/?\\]$/;

export const REGEX_MIME_TYPE = /data:([^;]+);base64,/;

export const REGEX_ACCOUNT = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
