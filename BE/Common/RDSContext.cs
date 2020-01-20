using Microsoft.EntityFrameworkCore;
using MobileServices.Models;

namespace MobileServices.Common
{
    public class RDSContext : DbContext
    {
        public RDSContext(DbContextOptions<RDSContext> options)
            : base(options)
        {
        }

        public DbSet<Mobile> Mobiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mobile>().ToTable("Mobile");
        }
    }
}
