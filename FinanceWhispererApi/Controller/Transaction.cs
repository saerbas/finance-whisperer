using FinanceWhispererApi.Data;
using FinanceWhispererApi.DTO.Transaction;
using FinanceWhispererApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinanceWhispererApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly FinanceDbContext _context;

        public TransactionsController(FinanceDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDTO>> PostTransaction(TransactionDTO createTransaction)
        {
            var transaction = new Transaction
            {
                Date = createTransaction.Date,
                Amount = createTransaction.Amount,
                Description = createTransaction.Description,
                Category = createTransaction.Category,
                Type = createTransaction.Type
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransactions), new { id = transaction.Id }, transaction);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

