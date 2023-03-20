using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hometask.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    UserAddress = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    RoleId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "TEXT", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 1, "Tel Aviv", "a5dc91cd-3b3f-4894-b72d-69aca0ff0adb" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 2, "Haifa", "435ea910-26d6-4d0e-8544-3c05cb5d73fa" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 3, "Ashdod", "fe572c65-d902-4e1e-821c-1623a9339b10" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 4, "Tel Aviv", "b65c5224-4bdd-43d8-a2bc-4c63a68fe6e9" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 5, "Ramat Gan", "ed93b446-9ccc-4f07-a8ff-b24bb0475a2d" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 6, "Tel Aviv", "03351434-48d3-40f6-9f81-21087c9152c0" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 7, "Haifa", "c7c38460-9b45-4e17-906d-6341313ea32a" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 8, "Ashdod", "c53bba58-2e27-4fb8-9ef3-5ededc07014c" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 9, "Tel Aviv", "1b3e8cd1-fa6a-4cbb-b3dd-a8689f0260bf" });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "Id", "UserAddress", "UserId" },
                values: new object[] { 10, "Ramat Gan", "0e4316e0-e503-40bd-9bfe-de4839e3b1a3" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "03351434-48d3-40f6-9f81-21087c9152c0", 0, "5194d8c6-2e11-46fe-b40f-df73b4ddf811", "tali@gmail.com", false, true, null, "TALI@GMAIL.COM", "TALI LEVI", "AQAAAAEAACcQAAAAEHcd5M8V1XN9/a7lSgfmU7n5TmnA2pELCmFeFcaZhIwtjuM8yl7GbxNGOnPkt8IEag==", null, false, "332fc3aa-292e-400b-97f3-1e3049108aa2", false, "Tali Levi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "0e4316e0-e503-40bd-9bfe-de4839e3b1a3", 0, "e731d83f-7c4e-4203-a41d-ac31121af6ae", "shir@gmail.com", false, true, null, "SHIR@GMAIL.COM", "SHIR LEVI", "AQAAAAEAACcQAAAAEL4wDKyajEIvZB+lWisccuhMK7hwwkWEZ+OW9teu4AChS74VRcHWrZJwjp3cY9VM+A==", null, false, "b4868ace-f007-4a9d-8a49-47f69c98ce04", false, "Shir Levi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "1b3e8cd1-fa6a-4cbb-b3dd-a8689f0260bf", 0, "87c7017d-1d8f-4d2b-8c1a-a7ddb5401301", "iris@gmail.com", false, true, null, "IRIS@GMAIL.COM", "IRIS AVITAL", "AQAAAAEAACcQAAAAEExUxsLd4rInB8zvHaE9E23BV1VmGV/r0s3FqDZDLaL9g3eQwimNqlqsTW0CORuP+w==", null, false, "6f19118e-0079-4b86-8204-85235a39dbc2", false, "Iris Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "435ea910-26d6-4d0e-8544-3c05cb5d73fa", 0, "eaa2dd78-b520-41e8-a889-c21c737e0db5", "rinat@gmail.com", false, true, null, "RINAT@GMAIL.COM", "RINAT ATIAS", "AQAAAAEAACcQAAAAEHF7ZaO3kgkzMGJB5L9zdCmu88M/tQbJSX91mKRjwcB/C+dGXyeImm5UkuKnnqyWMA==", null, false, "752ae343-3076-4e04-9cd6-627efef14f54", false, "Rinat Atias" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a5dc91cd-3b3f-4894-b72d-69aca0ff0adb", 0, "2922aeef-2f66-464b-87b3-4f1b51c4bd48", "coral@gmail.com", false, true, null, "CORAL@GMAIL.COM", "CORAL AVITAL", "AQAAAAEAACcQAAAAEIkjOJYTX7boImtKuqWiDiIf/JbdTS8X7s9193QenxtueU2U9CZ/rWGITFCLmbuAGA==", null, false, "eb8efde0-21d5-40c9-8804-7efb096308a8", false, "Coral Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "b65c5224-4bdd-43d8-a2bc-4c63a68fe6e9", 0, "d63c59b5-b5ce-41bd-a0b7-f6386876ac02", "adir@gmail.com", false, true, null, "ADIR@GMAIL.COM", "ADIR ALFASI", "AQAAAAEAACcQAAAAEAU90G8ckROi8IjCm7BB1qz12LIGMH1AGHPM+yQT1CjWo4/hsXwpVSqf6MLA39kUQA==", null, false, "9e454322-88bd-4dd2-afb1-9427b1813fed", false, "Adir Alfasi" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c53bba58-2e27-4fb8-9ef3-5ededc07014c", 0, "ecdbedf8-db58-466d-99bf-72870f143d81", "eli@gmail.com", false, true, null, "ELI@GMAIL.COM", "ELI DAHAN", "AQAAAAEAACcQAAAAEE3rtWWaQ0nM85Xv2x1v8/Sb5CGzJA22A+HWk/E5gFDoHrX1oFlw8IFJlFmfYevzeg==", null, false, "0352f586-d9c6-4014-8129-b68c4eccfe42", false, "Eli Dahan" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "c7c38460-9b45-4e17-906d-6341313ea32a", 0, "d3a648cf-770e-41d1-877c-30fd66faebb8", "tami@gmail.com", false, true, null, "TAMI@GMAIL.COM", "TAMI VANUNU", "AQAAAAEAACcQAAAAEI7jyqQIoOmQBixRNKjy3bGeaExWVvO9MoNFTd+CePAbRdgF3IF+9MafRvcaz5LIwg==", null, false, "5f2fc4a3-74ce-40a2-ac7d-264a74f582ff", false, "Tami Vanunu" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "ed93b446-9ccc-4f07-a8ff-b24bb0475a2d", 0, "54ed5d75-db52-4a64-b6fc-0dd069671453", "amit@gmail.com", false, true, null, "AMIT@GMAIL.COM", "AMIT AVITAL", "AQAAAAEAACcQAAAAEJWu2UHlSs4H30oqv2sgtwqB37422LB9MK5lUOVNjeIVhtTCvSsQsadMc7NA5sKOSA==", null, false, "aac6d7ae-422e-4784-a3bd-3ed63eb43fca", false, "Amit Avital" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "fe572c65-d902-4e1e-821c-1623a9339b10", 0, "b54f7d9e-889c-441f-932e-355d81334a8b", "bar@gmail.com", false, true, null, "BAR@GMAIL.COM", "BAR AVITAL", "AQAAAAEAACcQAAAAEC943x9C6RinP/CzGt3FCnOOBQ6uRNijx7ex65LZ8t6u9p0mmIfadU7jz77opSGMdA==", null, false, "a7ee7089-7428-426f-acba-88a247bb189d", false, "Bar Avital" });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
