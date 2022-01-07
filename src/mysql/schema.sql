CREATE DATABASE coinwatcher;

USE coinwatcher;

CREATE TABLE guilds (
  id VARCHAR(25) NOT NULL PRIMARY KEY UNIQUE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE currency_configs (
  server_id VARCHAR(25) NOT NULL PRIMARY KEY UNIQUE,
  FOREIGN KEY (server_id) REFERENCES guild(id),
  fiat_to_show TEXT NULL,   -- format: 'brl,eur,gbp'
  default_fiat VARCHAR(3) NOT NULL DEFAULT 'USD',
  crypto_to_show TEXT NULL, -- format: 'btc,eth,ada'
  default_crypto VARCHAR(16) NOT NULL DEFAULT 'BTC'
);

CREATE TABLE operational_configs (
  server_id VARCHAR(25) NOT NULL PRIMARY KEY UNIQUE,
  FOREIGN KEY (server_id) REFERENCES guild(id),
  channel_to_message_id VARCHAR(25) NULL,
  master_role_id VARCHAR(25) NULL
); 