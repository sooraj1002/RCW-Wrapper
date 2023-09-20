-- CreateTable
CREATE TABLE "User" (
    "did" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "Schema" (
    "did" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "schemaDID" TEXT NOT NULL,
    "templateIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Schema_pkey" PRIMARY KEY ("did")
);

-- CreateTable
CREATE TABLE "Templates" (
    "did" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "schemaId" TEXT,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("did")
);

-- AddForeignKey
ALTER TABLE "Schema" ADD CONSTRAINT "Schema_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("did") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema"("did") ON DELETE SET NULL ON UPDATE CASCADE;
