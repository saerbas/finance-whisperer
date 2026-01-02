using System;
using FinanceWhispererApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceWhispererApi.Data;

public class FinanceDbContext : DbContext
{
    public FinanceDbContext(DbContextOptions<FinanceDbContext> options) : base(options)
    {
    }

    // Define DbSets for Finance entities
    public DbSet<Transaction> Transactions { get; set; }

}
