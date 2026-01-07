using System;

namespace FinanceWhispererApi.DTO.Transaction;

public class TransactionDTO
{
    public DateTime Date { get; set; }
    public decimal Amount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Type { get; set; } = "EXPENSE";
}
