\echo 'Delete and recreate kurios db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE kurios;
CREATE DATABASE kurios;
\connect kurios

\i kurios-schema.sql
\i kurios-seed.sql

\echo 'Delete and recreate kurios_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE kurios_test;
CREATE DATABASE kurios_test;
\connect kurios_test

\i kurios-schema.sql
\i kurios-seed.sql
