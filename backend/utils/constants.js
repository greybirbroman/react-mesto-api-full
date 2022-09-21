const STATUS_OK = 200;
const STATUS_CREATED = 201;
const ERROR_CODE = 400;
const UNAUTORIZED_ERROR = 401;
const FOUND_ERROR_CODE = 404;
const SERVER_ERROR = 500;

const validUrl = (url) => {
  const regex = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/g
  if (regex.test(url)) {
    return url
  }
  throw new Error ('Некорректный url')
}

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  ERROR_CODE,
  UNAUTORIZED_ERROR,
  FOUND_ERROR_CODE,
  SERVER_ERROR,
  validUrl,
};
