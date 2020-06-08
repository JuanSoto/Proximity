import * as dotenv from 'dotenv';

if (process.env.TEST) {
  dotenv.config({ path: 'test.env' });
} else {
  dotenv.config();
}
