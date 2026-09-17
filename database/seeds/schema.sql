-- Active: 1789477658585@@127.0.0.1@5432@hosbank
-- 1. ROLES
CREATE TABLE roles (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(30) NOT NULL UNIQUE  -- 'client', 'agent', 'admin'
);

-- 2. USERS
CREATE TABLE users (
  id                    SERIAL PRIMARY KEY,
  role_id               INT NOT NULL,
  first_name            VARCHAR(100) NOT NULL,
  last_name             VARCHAR(100) NOT NULL,
  email                 VARCHAR(150) NOT NULL UNIQUE,
  password_hash         VARCHAR(255) NOT NULL,
  phone                 VARCHAR(20),
  email_verified        BOOLEAN DEFAULT FALSE,
  verification_token    VARCHAR(255),
  status                VARCHAR(20) DEFAULT 'active',   -- active / inactive
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 3. ACCOUNTS
CREATE TABLE accounts (
  id                SERIAL PRIMARY KEY,
  client_id         INT NOT NULL,
  account_number    VARCHAR(20) NOT NULL UNIQUE,
  type              VARCHAR(20) DEFAULT 'checking',  -- checking / savings
  balance           DECIMAL(15,2) DEFAULT 0,
  status            VARCHAR(20) DEFAULT 'active',    -- active / blocked / closed
  opened_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. RIBS (bank account statements / IBAN info)
CREATE TABLE ribs (
  id                SERIAL PRIMARY KEY,
  account_id        INT NOT NULL UNIQUE,  
  iban              VARCHAR(34) NOT NULL UNIQUE,
  bic               VARCHAR(11) NOT NULL,
  generated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- 5. BENEFICIARIES
CREATE TABLE beneficiaries (
  id                SERIAL PRIMARY KEY,
  client_id         INT NOT NULL,
  name              VARCHAR(150) NOT NULL,
  iban              VARCHAR(34) NOT NULL,
  bank_name         VARCHAR(100),
  is_favorite       BOOLEAN DEFAULT FALSE,
  added_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. CARDS
CREATE TABLE cards (
  id                SERIAL PRIMARY KEY,
  account_id        INT NOT NULL,
  masked_number     VARCHAR(25) NOT NULL,   
  type              VARCHAR(20) NOT NULL,   -- physical / virtual
  status            VARCHAR(20) DEFAULT 'active',  -- active / opposed / expired
  expiration_date   DATE,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- 7. TRANSACTIONS (operation history)
CREATE TABLE transactions (
  id                SERIAL PRIMARY KEY,
  account_id        INT NOT NULL,
  type              VARCHAR(20) NOT NULL,   -- debit / credit
  amount            DECIMAL(15,2) NOT NULL,
  balance_after     DECIMAL(15,2) NOT NULL,
  description       VARCHAR(255),
  date              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

-- 8. TRANSFERS
CREATE TABLE transfers (
  id                    SERIAL PRIMARY KEY,
  source_account_id     INT NOT NULL,
  beneficiary_id        INT NOT NULL,
  amount                DECIMAL(15,2) NOT NULL,
  reason                VARCHAR(255),
  status                VARCHAR(20) DEFAULT 'completed',  -- pending / completed / failed
  date                  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (source_account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(id) ON DELETE RESTRICT
);

-- 9. REQUESTS (generic — request_type differentiates)
CREATE TABLE requests (
  id                SERIAL PRIMARY KEY,
  client_id         INT NOT NULL,
  assigned_agent_id  INT,
  request_type      VARCHAR(30) NOT NULL,  -- rib / savings_account / virtual_card / pin_reset / card_opposition
  account_id        INT,                    -- for rib / savings_account requests
  card_id           INT,                    -- for virtual_card / pin_reset / card_opposition requests
  status            VARCHAR(20) DEFAULT 'pending',  -- pending / in_progress / processed / rejected
  comment           TEXT,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at      TIMESTAMP,

  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_agent_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL
);

-- 10. COMPLAINTS
CREATE TABLE complaints (
  id                SERIAL PRIMARY KEY,
  client_id         INT NOT NULL,
  assigned_agent_id  INT,
  subject           VARCHAR(150) NOT NULL,
  description       TEXT NOT NULL,
  status            VARCHAR(20) DEFAULT 'open',   -- open / in_progress / resolved
  priority          VARCHAR(20) DEFAULT 'normal', -- low / normal / high
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_agent_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 11. INTERACTIONS (agent comments/replies on requests or complaints)
CREATE TABLE interactions (
  id                SERIAL PRIMARY KEY,
  request_id        INT,
  complaint_id      INT,
  agent_id          INT NOT NULL,
  message           TEXT NOT NULL,
  date              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE CASCADE
);



INSERT INTO roles (name) VALUES ('client'), ('agent'), ('admin');



SELECT * FROM users;