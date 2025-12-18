-- CreateTable
CREATE TABLE "account_types" (
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "note" TEXT,

    CONSTRAINT "account_types_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "accounts" (
    "account_number" BIGINT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "account_type" VARCHAR(20) NOT NULL DEFAULT 'CHECKING',
    "balance" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_number")
);

-- CreateTable
CREATE TABLE "auth_methods" (
    "auth_method_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "method" VARCHAR(50) NOT NULL,
    "credential" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(50),
    "provider_uid" VARCHAR(100),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_methods_pkey" PRIMARY KEY ("auth_method_id")
);

-- CreateTable
CREATE TABLE "transaction_types" (
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "note" TEXT,

    CONSTRAINT "transaction_types_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "transactions" (
    "transaction_id" BIGSERIAL NOT NULL,
    "account_number" BIGINT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "transaction_type" VARCHAR(20) NOT NULL,
    "description" TEXT,
    "occurred_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "counterparty_account_number" BIGINT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" VARCHAR(255),
    "email" VARCHAR(254) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_account_number" ON "accounts"("account_number");

-- CreateIndex
CREATE INDEX "idx_accounts_user_id" ON "accounts"("user_id");

-- CreateIndex
CREATE INDEX "auth_methods_provider_uid_idx" ON "auth_methods"("provider_uid");

-- CreateIndex
CREATE UNIQUE INDEX "auth_methods_user_method_unique" ON "auth_methods"("user_id", "method");

-- CreateIndex
CREATE INDEX "idx_transactions_account" ON "transactions"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_methods" ADD CONSTRAINT "auth_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_number_fkey" FOREIGN KEY ("account_number") REFERENCES "accounts"("account_number") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_counterparty_account_number_fkey" FOREIGN KEY ("counterparty_account_number") REFERENCES "accounts"("account_number") ON DELETE SET NULL ON UPDATE NO ACTION;
