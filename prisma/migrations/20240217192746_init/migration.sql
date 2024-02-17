-- CreateTable
CREATE TABLE "Profile" (
    "supabaseId" TEXT NOT NULL,
    "googleProviderToken" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("supabaseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_supabaseId_key" ON "Profile"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_googleProviderToken_key" ON "Profile"("googleProviderToken");
