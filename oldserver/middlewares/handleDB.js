import { USE_DB } from '../config/index.js';

export default function ({ withDB, withoutDB }) {
  return function (req, res, next) {
    if (USE_DB) {
      withDB(req, res, next);
    } else {
      withoutDB(req, res, next);
    }
  };
}
