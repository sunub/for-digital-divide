-- DropIndex
DROP INDEX "auth_methods_provider_uid_idx";

-- CreateIndex
CREATE INDEX "auth_methods_provider_uid_provider_index" ON "auth_methods"("provider_uid", "provider");

-- CreateIndex
CREATE INDEX "idx_users_session_id" ON "users"("session_id");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "idx_users_name" ON "users"("name");
