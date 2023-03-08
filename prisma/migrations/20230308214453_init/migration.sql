-- CreateTable
CREATE TABLE "Contet" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreKeeper" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "StoreKeeper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreData" (
    "id" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storekeeper_id" TEXT NOT NULL,

    CONSTRAINT "StoreData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoreData_storekeeper_id_key" ON "StoreData"("storekeeper_id");
