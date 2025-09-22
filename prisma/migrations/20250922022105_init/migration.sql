/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Task` table. All the data in the column will be lost.
  - Added the required column `Id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TaskDescription` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Task'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Task] (
    [Id] INT NOT NULL IDENTITY(1,1),
    [TaskDescription] VARCHAR(255) NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [Task_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Task_pkey] PRIMARY KEY CLUSTERED ([Id])
);
IF EXISTS(SELECT * FROM [dbo].[Task])
    EXEC('INSERT INTO [dbo].[_prisma_new_Task] () SELECT  FROM [dbo].[Task] WITH (holdlock tablockx)');
DROP TABLE [dbo].[Task];
EXEC SP_RENAME N'dbo._prisma_new_Task', N'Task';
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
