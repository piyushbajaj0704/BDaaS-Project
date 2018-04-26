CREATE TABLE farm.users (
  ID      INT PRIMARY KEY     NOT NULL,
  NAME    VARCHAR(20)         NOT NULL,
  FARM_ID INT DEFAULT 1       NOT NULL
);

CREATE TABLE farm.plants (
  ID            INT PRIMARY KEY     NOT NULL,
  PLANT_SPECIES CHAR(30)            NOT NULL,
  FARM_ID       INT DEFAULT 1       NOT NULL,
  SENSOR_ID     INT                 NOT NULL,
  SEED_PRICE    INT

);

CREATE TABLE farm.farms (
  ID       INT PRIMARY KEY     NOT NULL,
  SID      INT                 NOT NULL,
  ADDRESS  VARCHAR(30),
  INDUSTRY VARCHAR(30),
  OWNER    INT
);

CREATE TABLE farm.sensordata (
  ID          INT PRIMARY KEY     NOT NULL,
  FID         INT DEFAULT 1       NOT NULL,
  PID         INT                 NOT NULL,
  MOISTURE    REAL,
  TEMPERATURE REAL,
  LIGHT       REAL,
  UPDATE      TIMESTAMP
);

