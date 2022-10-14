#!/usr/bin/node

const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const dotenv = require('dotenv');
const { exit } = require('process');

dotenv.config();

const { NODE_ENV, POSTGRES_DB_TEST, POSTGRES_DB, POSTGRES_USER } = process.env;

const database = NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST;

const tearDown = async () => {
  try {
    const { stdout } = await exec(
      `psql -d ${database} -U ${POSTGRES_USER} -a -W -f ${path.join(
        __dirname,
        '..',
        'data',
        'teardown.sql'
      )}`
    );
    console.log(
      `[data migrations] teardownd script started running on ${database} database...\n`,
      stdout
    );
  } catch (error) {
    exit(1);
  }
};

tearDown();
